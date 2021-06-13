const fs = require("fs");

const TESTEDL =
  "/Users/tomsugden/programming/javascript/conformity/test/edls/dissolve_test.edl";

class EDL {
  constructor() {
    this.title;
    this.fcm;
    this.headerString = "";
    this.footerString = "";
    this.events = [];
  }

  static matcher(string) {
    for (const regex of EDL.regex) {
      const match = string.match(regex);
      if (match) {
        return match;
      }
    }
    return null;
  }

  applyMetadata(matchGroup) {
    for (const key of Object.keys(matchGroup)) {
      this[key] = matchGroup[key];
    }
  }

  appendHeaderString(string) {
    this.headerString += string + "\n";
  }

  appendEvent(event) {
    this.events.push(event);
  }
}
EDL.regex = [
  /^TITLE:\s*(?<title>.+)$/, // TITLE: edl_title
  /^FCM:\s*(?<fcm>.+)$/, // FCM: NON-DROP FRAME
];

class Event {
  constructor(match) {
    this.number = match.number;
    this.tapename = match.tapename;
    this.track = match.track;
    this.transitionType = match.transitionType;
    this.transitionLength = match.transitionLength;

    this.sourceIn = match.sourceIn;
    this.sourceOut = match.sourceOut;
    this.recordIn = match.recordIn;
    this.recordOut = match.recordOut;

    this.fromClipname;
    this.toClipname;
    this.sourcefile;
    this.locators = [];

    this.ascSlopeR;
    this.ascSlopeG;
    this.ascSlopeB;
    this.ascOffsetR;
    this.ascOffsetG;
    this.ascOffsetB;
    this.ascPowerR;
    this.ascPowerG;
    this.ascPowerB;
    this.ascSat;

    this.string = "";
  }

  static matcher(string) {
    for (const regex of Event.regex.metadata) {
      const match = string.match(regex);
      if (match) {
        return match;
      }
    }
    return null;
  }

  applyMetadata(matchGroup) {
    for (const key of Object.keys(matchGroup)) {
      if (key === "locator") {
        this.locators.push(matchGroup[key]);
      } else {
        this[key] = matchGroup[key];
      }
    }
  }

  appendString(string) {
    this.string += string + "\n";
  }
}
Event.regex = {
  event: /^(?<number>\d+)\s+(?<tapename>[^\s]+)\s+(?<track>[Vv])\s+(?<transitionType>[CcDd]|[Ww]\d+)\s+(?<transitionLength>\d+)?[\s+]?(?<sourceIn>\d{2}:\d{2}:\d{2}:\d{2})\s+(?<sourceOut>\d{2}:\d{2}:\d{2}:\d{2})\s+(?<recordIn>\d{2}:\d{2}:\d{2}:\d{2})\s+(?<recordOut>\d{2}:\d{2}:\d{2}:\d{2})\s*$/,
  metadata: [
    /^.*FROM CLIP NAME\s*:\s*(?<fromClipname>.+)$/, // * FROM CLIP NAME: ClipA
    /^.*TO CLIP NAME\s*:\s*(?<toClipname>.+)$/, // * TO CLIP NAME: ClipB
    /^.*SOURCE FILE\s*:\s*(?<sourcefile>.+)$/, // * TO CLIP NAME: ClipB
    /^.*LOC\s*:\s*(?<locator>.+)$/, // * LOC: 01:00:01:14 RED     ANIM FIX NEEDED
    /^.*ASC_SOP\s*:?\s*\(\s*(?<ascSlopeR>[^\s]+)\s+(?<ascSlopeG>[^\s]+)\s+(?<ascSlopeB>[^\s]+)\s*\)\s*\(\s*(?<ascOffsetR>[^\s]+)\s+(?<ascOffsetG>[^\s]+)\s+(?<ascOffsetB>[^\s]+)\s*\)\s*\(\s*(?<ascPowerR>[^\s]+)\s+(?<ascPowerG>[^\s]+)\s+(?<ascPowerB>[^\s]+)\s*\).*$/, // *ASC_SOP: (0.1 0.2 0.3) (1.0 -0.0122 0.0305) (1.0 0.0 1.0)
    /^.*ASC_SAT\s*:?\s*(?<ascSat>.+)$/, // * ASC SAT: 0.9
  ],
};

async function* readEDL(edl) {
  const lines = await fs.promises
    .readFile(edl, "utf-8")
    .then((res) => res.split(/\r?\n/));

  for await (const line of lines) {
    yield line;
  }
}

async function parseEDL() {
  const edl = new EDL();
  let event;

  const sections = Object.freeze({ header: 1, body: 2 });
  let section = sections.header;

  // Get header info
  for await (const line of readEDL(TESTEDL)) {
    if (section === sections.body) {
      const match = line.match(Event.regex.event);

      if (match) {
        edl.appendEvent(event);
        event = new Event(match.groups);
        event.appendString(match.input);
      } else {
        // Continuation of previous event
        // Try to parse metadata
        const metaMatch = Event.matcher(line);
        if (metaMatch) {
          event.applyMetadata(metaMatch.groups);
        }
        event.appendString(line);
      }
      //
    } else if (section === sections.header) {
      const match = line.match(Event.regex.event);

      if (match) {
        // End of header section
        event = new Event(match.groups);
        event.appendString(match.input);
        section = sections.body;
      } else {
        const headerMatch = EDL.matcher(line);
        if (headerMatch) {
          edl.applyMetadata(headerMatch.groups);
        }
        edl.appendHeaderString(line);
      }
    }
  }
  if (event) {
    edl.appendEvent(event);
  }

  //process.stdout.write(edl.headerString);
  //console.log(edl);
  for (const e of edl.events) {
    if (e.locators.length) {
      console.log(e);
    }
  }
}

parseEDL();
