const fs = require("fs");
const path = require("path");

class ErrorFs extends Error {
  constructor(message) {
    super(message);
    this.name = "Error";
  }

  toObject() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}

class FileFs {
  constructor(file) {
    this.root = file.root;
    this.dir = file.dir;
    this.basename = file.base; // base property conflicts with mongoose discriminators
    this.ext = file.ext;
    this.name = file.name;
  }

  toObject() {
    return {
      root: this.root,
      dir: this.dir,
      ext: this.ext,
      name: this.name,
      basename: this.basename,
    };
  }
}

class SequenceFs extends FileFs {
  constructor(file) {
    super(file);

    this.broken = false;

    const nameProperties = this.name.match(SequenceFs.nameRegex);
    this.frameIn = nameProperties.groups.frame;
    this.frameOut = nameProperties.groups.frame;
    this.namePre = nameProperties.groups.namePre;
    this.namePost = nameProperties.groups.namePost;
    this.padding = this.frameIn.length;

    const resProperties = this.dir.match(SequenceFs.resolutionRegex);
    if (resProperties) {
      this.resolution = resProperties.groups.resolution;
      this.width = parseInt(resProperties.groups.width);
      this.height = parseInt(resProperties.groups.height);
    }
  }

  get sequenceName() {
    return `${this.namePre}[${this.frameIn}-${this.frameOut}]${this.namePost}`;
  }

  get sequenceBasename() {
    return `${this.sequenceName}${this.ext}`;
  }

  get length() {
    return parseInt(this.frameOut) - parseInt(this.frameIn) + 1;
  }

  get frameMid() {
    const middle = Math.ceil(
      (parseInt(this.frameIn) + parseInt(this.frameOut)) / 2
    );
    return middle.toString().padStart(this.frameIn.length, "0");
  }

  static isSequence(file) {
    return (
      SequenceFs.validExts.includes(file.ext.toLowerCase()) &&
      file.name.match(SequenceFs.nameRegex)
    );
  }

  isSameSequence(frame) {
    return (
      this.dir === frame.dir &&
      this.ext === frame.ext &&
      this.namePre === frame.namePre &&
      this.namePost === frame.namePost &&
      this.padding === frame.padding
    );
  }

  isNextFrame(frame) {
    return parseInt(frame.frameIn) === parseInt(this.frameOut) + 1;
  }

  extendSequence(frame) {
    this.frameOut = frame.frameOut;
  }

  toObject() {
    return {
      ...super.toObject(),
      name: this.sequenceName,
      namePre: this.namePre,
      namePost: this.namePost,
      basename: this.sequenceBasename,
      frameIn: this.frameIn,
      frameOut: this.frameOut,
      frameMid: this.frameMid,
      length: this.length,
      padding: this.padding,
      resolution: this.resolution,
      width: this.width,
      height: this.height,
      broken: this.broken,
    };
  }
}

SequenceFs.validExts = [".exr", ".dpx", ".tif", ".tiff"];
//
// (?<namePre>^.*?)  Named capture group: Match start of string then zero or more characters. Non-greedy.
// (?<frame>\d+)     Named capture group: Match one or more digits.
// (?=[^\d]*$)       Positive lookahead:  Match previous group up until no further characters are digits.
// (?<namePost>.*$)  Named capture group: Match zero or more characters until the end of the string.
//
SequenceFs.nameRegex = /(?<namePre>^.*?)(?<frame>\d+)(?=[^\d]*$)(?<namePost>.*$)/;
//
// [/]               Directory boundary.
// (?<resolution>    Named capture group: Match resolution folder Ex: 4096x1716.
//   (?<width>\d+)   Named capture group: Match one or more numbers.
//   [xX]            Match literal x or X.
//   (?<height>\d+)  Named capture group: Match one or more numbers.
// )                 End of resolution capture group.
// (?:$|[/])         Non capturing group: EOL or directory boundary.
// (?!.*\d+[xX]\d+)  Negative lookahead:  Get the last occuring resoultion directory, just in case.
//
SequenceFs.resolutionRegex = /[/](?<resolution>(?<width>\d+)[xX](?<height>\d+))(?:$|[/])(?!.*\d+[xX]\d+)/;

async function* walkDirectory(directory) {
  try {
    const dirents = (
      await fs.promises.readdir(directory, { withFileTypes: true })
    ).sort((a, b) => a.name.localeCompare(b.name));

    for (const dirent of dirents) {
      const absPath = path.join(directory, dirent.name);

      if (dirent.isDirectory()) {
        yield* walkDirectory(absPath);
      } else {
        yield absPath;
      }
    }
  } catch (err) {
    yield new ErrorFs(err.message);
  }
}

async function* parseFiles(fileIterator) {
  for await (const file of fileIterator) {
    if (file instanceof Error) {
      yield file;
      continue;
    }

    const parsed = path.parse(file);

    if (SequenceFs.isSequence(parsed)) {
      yield new SequenceFs(parsed);
    } else {
      yield new FileFs(parsed);
    }
  }
}

async function* parseSequences(frameIter) {
  let previous;

  for await (const frame of frameIter) {
    if (!(frame instanceof SequenceFs)) {
      yield frame;
      continue;
    }

    if (!previous) {
      // First frame of new sequence
      previous = frame;
    } else if (!previous.isSameSequence(frame)) {
      // Not the same sequence. Yield existing sequence
      // Begin first frame of new sequence
      yield previous;
      previous = frame;
    } else if (!previous.isNextFrame(frame)) {
      // Same sequence but not the expected frame number
      // Possibly broken
      frame.broken = true;
      if (!previous.broken) {
        previous.broken = true;
      }
      yield previous;
      previous = frame;
    } else {
      // All tests passed. This is the next frame of the sequence
      // Extend sequence
      previous.extendSequence(frame);
    }
  }
  if (previous) {
    // last sequence
    yield previous;
  }
}

async function* indexFilesystem(directory) {
  const files = parseSequences(parseFiles(walkDirectory(directory)));

  for await (const f of files) {
    yield f;
  }
}

async function listDirectories(directory) {
  const dirents = await fs.promises.readdir(directory, {
    withFileTypes: true,
  });
  const dirs = [];

  for await (const dirent of dirents) {
    const absPath = path.join(directory, dirent.name);
    if (dirent.isDirectory()) {
      dirs.push(absPath);
    }
  }

  return dirs;
}

module.exports = {
  indexFilesystem,
  listDirectories,
  FileFs,
  SequenceFs,
  ErrorFs,
};
