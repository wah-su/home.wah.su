import BentoCard from "./BentoCards/BentoCard";
import Footer from "./Footer";

export default function Bento() {
  return (
    <div className="hidden lg:grid px-8 mt-8 lg:mt-16 xl:mt-0 w-full grid-cols-[repeat(4,minmax(0,280px))] grid-rows-[repeat(4,minmax(0,160px))] gap-2">
      {/* <BentoCard
        logo="/static/images/logos/xbb.png"
        image="/static/images/cards/xbb.png"
        title="XBackBone"
        color="17,24,39"
        description="Image uploading with ShareX compatibility."
        className="row-[1]"
        link="https://file.wah.su"
      /> */}
      {/* <BentoCard
        logo="/static/images/logos/matrix.png"
        image="/static/images/cards/matrix.png"
        title="Matrix"
        color="17,24,39"
        description="An open network for secure, decentralised communication."
        className="row-[1]"
        link="https://chat.wah.su"
      /> */}
      <BentoCard
        type="big"
        logo="/static/images/logos/nextcloud.png"
        image="/static/images/cards/nextcloud.png"
        title="NextCloud"
        color="255,255,255"
        description="Privacy-Friendly, productivity suite, offering file sharing and collaboration tools."
        className="text-black"
        link="https://cloud.wah.su"
      />
      <BentoCard
        type="big"
        logo="/static/images/logos/vaultwarden.png"
        image="/static/images/cards/vaultwarden.png"
        title="Vaultwarden"
        color="255,255,255"
        description="Unofficial Bitwarden password manager compatible server."
        className="text-black"
        link="https://vault.wah.su"
      />
      <BentoCard
        type="big"
        logo="/static/images/logos/immich.png"
        image="/static/images/cards/immich.png"
        title="Immich"
        color="0,0,0"
        description="Platform for managing and browsing your photos. Privacy-Friendly Google Photos alternative."
        className=""
        link="https://photos.wah.su"
      />
      {/* <BentoCard
        logo="/static/images/logos/linkwarden.png"
        image="/static/images/cards/linkwarden.png"
        title="Linkwarden"
        color="17,24,39"
        description="Bookmark manager to collect, organize, and preserve webpages."
        className="row-[4]"
        link="https://links.wah.su"
      /> */}
      <BentoCard
        type="big"
        logo="/static/images/logos/forgejo.png"
        image="/static/images/cards/forgejo.png"
        title="Forgejo"
        color="17,24,39"
        description="Federated Git Hosting made easy."
        className=""
        link="https://git.wah.su"
      />
      <Footer className="col-span-full" id="footer" />
    </div>
  );
}
