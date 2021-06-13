import React, { useState } from "react";

import { Modal, ModalHeader, ModalContent, ModalActions } from "../modal";
import { Button } from "../form";

import "./Home.css";

const Home = () => {
  const [show, setShow] = useState(false);

  return (
    <main id="home" className="container">
      <div className="content">
        <h3>Home</h3>
        <button onClick={() => setShow(true)}>Click me</button>
        <Modal show={show} onClose={() => setShow(false)}>
          <ModalHeader content="Content" />
          <ModalContent>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              repudiandae amet facere, voluptate at veniam harum repellat minima
              voluptas fugit culpa esse praesentium? Reiciendis, tempore amet
              nam nemo temporibus iusto ea eveniet unde reprehenderit ullam
              consectetur vitae quo assumenda, nisi, incidunt vero odit minus
              in? Itaque unde veniam dolorum! Labore harum maiores at tenetur
              itaque dolorum impedit molestias temporibus dolore officia debitis
              inventore aliquam porro esse rem beatae iure, modi vel. Quaerat,
              nam ducimus exercitationem qui earum voluptatem magnam illum eum
              assumenda quod enim aliquid, perferendis atque expedita distinctio
              quas dolor tempore error incidunt fugit. Accusantium nihil
              recusandae eveniet voluptates quas fuga, minima repellendus ea vel
              fugit aliquid similique iure dolorem rem repudiandae hic, pariatur
              voluptatem voluptatum quo nulla exercitationem deserunt debitis
              ipsa doloremque! Repellendus iure voluptas ex odit quasi ratione,
              repudiandae, vel illo laudantium eos suscipit dolor nisi nam enim
              tempore officia, itaque ab fuga ut explicabo voluptatum natus
              exercitationem odio! Laborum praesentium, animi quas voluptatum
              magnam tempora, autem libero iste qui, reprehenderit nostrum
              molestiae delectus accusantium. Quasi dolorem aliquid nulla
              consequatur, nam voluptatem perspiciatis, qui mollitia repellendus
              error ut, quis magnam temporibus sint velit officia iste molestias
              laboriosam asperiores quaerat deleniti rerum. Sunt assumenda neque
              ex illo quidem saepe nesciunt exercitationem corrupti nisi minus
              laudantium accusamus impedit, asperiores rerum dolorem voluptatem
              sapiente modi, ea quas. Deserunt consequuntur maiores impedit,
              inventore reprehenderit quae iste et itaque dolore enim hic rerum
              aliquam rem? Sequi accusamus accusantium cum libero explicabo
              veritatis nemo? Neque, doloremque eveniet accusamus hic iure enim
              obcaecati natus impedit nulla reiciendis maiores at non! Minus sed
              nisi totam nihil eum laborum, quod deserunt, hic dignissimos
              aperiam corrupti voluptatem, corporis suscipit excepturi tempore
              consequatur iste accusamus! Atque, quo, voluptate repudiandae ex
              cum beatae harum nostrum architecto alias optio mollitia eius ab
              facere assumenda error repellat hic laudantium enim voluptas
              ratione at voluptatibus. Eaque vitae saepe totam porro,
              repudiandae accusantium quo corporis sit asperiores ullam
              blanditiis, voluptatum dolores neque assumenda officia dolorem,
              minus omnis. Necessitatibus fugiat repellendus tempore! Temporibus
              voluptate praesentium quidem, deleniti facilis iste blanditiis
              facere est aliquam nesciunt labore tempora sit. Fuga assumenda
              repellendus, quam minus optio, a magnam aspernatur unde odio
              facilis quod? Distinctio laboriosam ad quod tempora rerum
              similique ipsum possimus optio non, id, recusandae libero ut
              molestias. Minus voluptatum dolorum tempore ipsum odit quos,
              ratione vitae vel quis asperiores corrupti id expedita autem
              adipisci delectus inventore ex eum, doloremque sed praesentium
              accusamus in obcaecati laboriosam alias! Magnam sed deleniti sit
              quaerat, illo similique iure maxime aliquid alias voluptatum
              voluptas consequuntur accusantium tenetur suscipit, itaque nostrum
              enim autem odio doloremque iusto corrupti doloribus. Ut rem minus
              minima iusto facilis in possimus eius at optio consequatur laborum
              non, quis deserunt impedit quibusdam voluptatem mollitia magnam,
              explicabo modi! Tempore dolore in amet tenetur! Quod, expedita
              mollitia illo possimus inventore hic, iure voluptates explicabo
              voluptas quasi ullam sequi blanditiis voluptatem! Vero assumenda
              accusamus hic autem nam, tenetur rerum sequi qui distinctio nulla
              cum velit dolore aut, consectetur magnam repudiandae laborum. Quos
              dicta commodi sit magni corrupti! Aperiam eaque cupiditate quos
              autem, ullam velit at unde necessitatibus laborum amet possimus
              distinctio sed tempore rem iure tempora maxime suscipit,
              consequatur officiis excepturi consequuntur vel. Quo cum doloribus
              ipsa sequi, reprehenderit voluptate eaque error veritatis officia
              provident ratione iste nostrum. Quisquam aut perferendis aliquid
              quod ipsum voluptatibus impedit quas animi similique quos
              excepturi consequuntur quo nostrum reprehenderit, consectetur
              minus. Maxime architecto aperiam ipsa eligendi incidunt illo,
              blanditiis repudiandae eos nulla eum! Porro neque, unde quaerat
              officia commodi suscipit? Quis ab in dicta minus tempora quos
              natus et consectetur quo nemo, quisquam culpa fuga eveniet
              excepturi nulla, voluptatum doloremque vitae libero modi!
              Molestias.
            </p>
          </ModalContent>
          <ModalActions position="left">
            <Button content="Test L" onClick={() => setShow(false)} />
            <Button content="Test L" onClick={() => setShow(false)} />
          </ModalActions>
          <ModalActions position="right"></ModalActions>
        </Modal>
      </div>
    </main>
  );
};

export default Home;
