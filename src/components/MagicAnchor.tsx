import gsap from "gsap";
import {
  createRenderEffect,
  createSignal,
  mergeProps,
  Show,
  splitProps,
  type ComponentProps,
} from "solid-js";

export type MagicAnchorProps = ComponentProps<"a"> & {
  charmingText: string;
} & (
    | {
        imgUrl?: string;
        totalImages?: number;
      }
    | { imgUrl: never; totalImages: never }
  );

export function MagicAnchor(props: MagicAnchorProps) {
  if (Boolean(props.imgUrl?.length)) {
    props = mergeProps({ totalImages: 10 }, props);
  }

  const [componentProps, HTMLNodeProps] = splitProps(props, [
    "imgUrl",
    "totalImages",
    "charmingText",
  ]);

  const [imgContainerPosition, setImgContainerPosition] = createSignal({
    top: "0px",
    left: "0px",
  });

  let magicAnchorRef: HTMLAnchorElement;
  const charmingCharRefs: HTMLSpanElement[] = [];
  const revealImgRefs: HTMLDivElement[] = [];

  return (
    <a
      ref={(ref) => (magicAnchorRef = ref)}
      class="relative font-semibold [&>span]-(inline-block whitespace-pre)"
      onMouseEnter={({ clientX, clientY }) => {
        const scrollLeft =
          document.body.scrollLeft + document.documentElement.scrollLeft;
        const scrollTop =
          document.body.scrollTop + document.documentElement.scrollTop;

        // setImgContainerPosition({
        //   top: `${clientY + 20 - scrollTop}px`,
        //   left: `${clientX + 20 - scrollLeft}px`,
        // });

        // Animage images
        gsap.killTweensOf(revealImgRefs);

        const tl = gsap
          .timeline({
            onStart: () => {
              // set curr el z-index: 1000
            },
          })
          .set(revealImgRefs, { opacity: 0 });

        for (let i = 0; i < revealImgRefs.length - 1; ++i) {
          const ref = revealImgRefs[i];

          gsap.set(ref, {
            x:
              i === revealImgRefs.length - 1
                ? "0%"
                : `${getRandomFloat(-5, 5)}%`,
            y:
              i === revealImgRefs.length - 1
                ? "0%"
                : `${getRandomFloat(-5, 5)}%`,
          });

          tl.to(
            ref,
            {
              opacity: i === revealImgRefs.length - 1 ? 1 : 0,

              startAt: { opacity: 1 },

              ease: "expo.out",
              duration: 0.25,
            },
            i * 0.4,
          );
        }

        // Animate characters
        charmingCharRefs.forEach((ref) => {
          gsap.to(ref, {
            x: "0%",
            y: "0%",

            startAt: {
              x: `${getRandomFloat(-30, 30)}%`,
              y: `${getRandomFloat(-30, 30)}%`,
            },

            onStart: () => {
              gsap.set(ref, getCharStyles());
            },
            onRepeat: () => {
              gsap.set(ref, getCharStyles());
            },
            onComplete: () => {
              gsap.set(ref, {
                color: window.getComputedStyle(magicAnchorRef).color,
                opacity: 1,
              });
            },

            ease: "expo.out",
            repeat: 3,
            duration: 0.1,
          });
        });
      }}
      onMouseMove={({ clientX, clientY }) => {
        const scrollLeft =
          document.body.scrollLeft + document.documentElement.scrollLeft;
        const scrollTop =
          document.body.scrollTop + document.documentElement.scrollTop;

        // setImgContainerPosition({
        //   top: `${clientY + 20 - scrollTop}px`,
        //   left: `${clientX + 20 - scrollLeft}px`,
        // });
      }}
      onMouseLeave={() => {
        // hide image
      }}
      {...HTMLNodeProps}
    >
      {props.charmingText.split("").map((c) => (
        <span ref={(ref) => charmingCharRefs.push(ref)}>{c}</span>
      ))}

      <Show when={Boolean(props.imgUrl?.length)}>
        <div
          class="fixed w-200px h-150px pointer-events-none opacity-0 [&>div]-(w-full h-full relative bg-cover bg-center)"
          style={{
            top: imgContainerPosition().top,
            left: imgContainerPosition().left,
          }}
        >
          {[...new Array(componentProps.totalImages)].map((_, i) => (
            <div
              ref={(ref) => revealImgRefs.push(ref)}
              class="absolute"
              style={{
                "background-image": `url(${componentProps.imgUrl})`,
                ...(i === componentProps.totalImages! - 1 && {
                  filter: "hue-rotate(60deg) saturate(5)",
                }),
              }}
            >
              {i}
            </div>
          ))}
        </div>
      </Show>
    </a>
  );
}

function getRandomFloat(min: number, max: number) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function getCharStyles() {
  return {
    color: ["#fff", "#0ff", "#f0f"][parseInt(getRandomFloat(0, 3))],
    opacity: Math.round(Math.random()) === 0 ? 1 : 0,
  };
}

{
  /* <div class="block" data-fx="20">
  <a class="block__title" data-img="img/2.jpg">Effect 20</a>
  <a class="block__link" data-img="img/24.jpg">Ruiner</a>
</div> */
}
