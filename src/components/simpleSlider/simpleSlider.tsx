import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './simpleSlider.module.css';

interface SimpleSliderProps {
  settings: Settings;
  children?: React.ReactNode;
}

type Settings = {
  onArrow?: boolean;
  onDots?: boolean;
  slideToShow?: number;
  responsive?: Responsive[];
};

type Responsive = {
  breakpoint: number;
  settings: Settings;
};

const SimpleSlider = ({ settings, children }: SimpleSliderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(0);
  const setting = useRef<Settings | null>(settings);
  const defaultSetting = settings;
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<HTMLUListElement>(null);
  const createSlide = useCallback(() => {
    // slide 생성.
    const slideWidth = slidesContainerRef.current!.clientWidth;
    const slideLength = slidesRef.current!.childElementCount;
    const showSlide = setting.current!.slideToShow
      ? setting.current!.slideToShow
      : 1;
    setLength(Math.ceil(slideLength / showSlide));
    const slidesWidth = Math.ceil((slideWidth * slideLength) / showSlide);

    slidesRef.current!.style.width = `${slidesWidth}px`;
    setSlidePosition();
  }, []);

  const setSlidePosition = () => {
    // browser size 변경시, slide제대로 위차하게 자리 재조정.
    const width = slidesContainerRef.current!.clientWidth;
    const slideLength = slidesRef.current!.childElementCount;
    let currentPosition = slidesRef.current!.style.transform;
    let newPosition = 0;

    if (!currentPosition) {
      return;
    }

    currentPosition = currentPosition.replace(/[^0-9]/g, '');
    for (let i = 1; i < slideLength; i++) {
      if (width * i >= parseInt(currentPosition)) {
        const next = width * i - parseInt(currentPosition);
        const prev = parseInt(currentPosition) - width * (i - 1);
        newPosition = prev > next ? width * i : width * (i - 1);
        break;
      }
    }
    slidesRef.current!.style.transform = `translateX(${-newPosition}px)`;
  };

  const createDots = useCallback(() => {
    // slide dots 생성.
    const dots = document.querySelector('.simple__dots')! as HTMLElement;
    dots.innerHTML = '';

    if (!setting.current!.onDots) {
      return;
    }

    const slideLength = slidesRef.current!.childElementCount;
    const showSlide = setting.current!.slideToShow
      ? setting.current!.slideToShow
      : 1;
    const dotLength = Math.ceil(slideLength / showSlide);
    const initIndex = currentIndex;

    for (let i = 0; i < dotLength; i++) {
      const dot = document.createElement('li');
      dot.classList.add('simple__dot');
      dots.appendChild(dot);
    }
    onActive(initIndex);
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    // slide 이동.
    const slideWidth = slidesContainerRef.current!.clientWidth;
    slidesRef.current!.style.transform = `translateX(${-(
      slideWidth * index
    )}px)`;

    if (setting.current!.onDots) {
      onActive(index);
    }
  };

  const onActive = (index: number) => {
    // slide 이동시 일치하는 dot에 style부여.
    const targetDot = dotsRef.current!.childNodes[index]! as HTMLElement;
    dotsRef.current!.childNodes.forEach((dot) => {
      const dotElement = dot! as HTMLElement;
      dotElement.classList.remove('active');
    });
    targetDot.classList.add('active');
  };

  const onPrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // slide 뒤로 이동.
    e.preventDefault();
    let next = currentIndex - 1;
    if (next < 0) {
      next = length - 1;
    }
    setCurrentIndex(next);
    goToSlide(next);
  };

  const onNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // slide 앞으로 이동.
    e.preventDefault();
    let next = currentIndex + 1;
    if (next > length - 1) {
      next = 0;
    }
    setCurrentIndex(next);
    goToSlide(next);
  };

  const onDotClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target! as HTMLElement;
    // dot click으로 slide 이동.
    if (!target.matches('.simple__dot')) {
      return;
    }

    const parent = target.parentNode;
    const targetIndex = Array.prototype.indexOf.call(
      parent!.childNodes,
      e.target
    );
    goToSlide(targetIndex);
    setCurrentIndex(targetIndex);
  };

  const changeSettings = useCallback(() => {
    // responsive에 맞게 slide 설정값 조정.
    const clientWidth = window.innerWidth;
    let newSetting = null;

    if (!setting.current!.responsive) {
      createSlide();
      createDots();
      return;
    }

    if (clientWidth > setting.current!.responsive[0].breakpoint) {
      newSetting = defaultSetting;
    } else {
      for (let i = 0; i < setting.current!.responsive.length; i++) {
        if (clientWidth <= setting.current!.responsive[i].breakpoint) {
          if (!setting.current!.responsive[i + 1]) {
            newSetting = setting.current!.responsive[i].settings;
            break;
          }

          if (
            setting.current!.responsive[i + 1] &&
            clientWidth > setting.current!.responsive[i + 1].breakpoint
          ) {
            newSetting = setting.current!.responsive[i].settings;
          } else if (
            setting.current!.responsive[i + 1] &&
            clientWidth <= setting.current!.responsive[i + 1].breakpoint
          ) {
            continue;
          }
        }
      }
    }

    const updated = { ...newSetting };
    updated['responsive'] = setting.current!.responsive;
    setting.current = updated;

    createSlide();
    createDots();
  }, [setting, createDots, createSlide, defaultSetting]);

  useEffect(() => {
    if (slideRef.current && !loading) {
      // 처음 로딩되었을 때, browser size에 맞게 설정값 부여.
      changeSettings();
      setLoading(true);
    }

    window.addEventListener('resize', changeSettings);
    // broswer size가 변경되었을 때, 다시 설정값 조정.

    return () => {
      window.removeEventListener('resize', changeSettings);
    };
  }, [changeSettings, loading, slideRef]);

  return (
    <div className={`${styles.slider} simple__slider`}>
      <div className={styles.slidesContainer} ref={slidesContainerRef}>
        <div className={styles.slides} ref={slidesRef}>
          {(children! as []).map((slide, index) => (
            <div className={styles.slide} ref={slideRef} key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      {setting.current!.onArrow && (
        <div className={styles.arrow}>
          <button className={styles.prev} ref={prevRef} onClick={onPrevClick}>
            <i className={`${styles.icon} fas fa-chevron-left`}></i>
          </button>
          <button className={styles.next} ref={nextRef} onClick={onNextClick}>
            <i className={`${styles.icon} fas fa-chevron-right`}></i>
          </button>
        </div>
      )}
      <ul
        className={`${styles.dots} simple__dots`}
        onClick={onDotClick}
        ref={dotsRef}
      ></ul>
    </div>
  );
};

export default SimpleSlider;
