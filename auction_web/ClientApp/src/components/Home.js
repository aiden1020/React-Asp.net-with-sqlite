import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'https://cdn.discordapp.com/attachments/487854038977609730/1169945797748605000/21975240f2e2512c.png?ex=65573fee&is=6544caee&hm=6b69d8b7f3f59705733d31c6a5141a14e6b39a56b8d8fd731d7ce7f8a76cdab0&',
    caption : "",
    key: 1,
  },
  {
    src: 'https://cdn.discordapp.com/attachments/487854038977609730/1169947457677955194/-2.png?ex=6557417a&is=6544cc7a&hm=da2c1d437e5062d8bac27df3ea949e5ecaa5c2f8f70c22e26d5470be3cdbaf37&',
    caption : "",
    key: 2,
  },
  {
    src: 'https://cdn.discordapp.com/attachments/487854038977609730/1169948519327604786/-3.png?ex=65574277&is=6544cd77&hm=b12de88973096ccc390b1f566af3b829fea81e265f12cdb8b6c1630e171aa3a7&',
    caption : "",
    key: 3,
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.key}
    >
      <img src={item.src} alt={item.altText} />
      <CarouselCaption
        captionText={item.caption}
        captionHeader={item.caption}
      />
    </CarouselItem>
  ));

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
    
  );
}

