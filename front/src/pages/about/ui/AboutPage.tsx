import { useEffect, useRef, useState } from 'react';

import { SeoHelmet } from '~shared/lib/seo';

// Import images
import ceo from '~shared/assets/about/about-ceo.jpg';
import Canada from '~shared/assets/about/Canada.png';
import fifa from '~shared/assets/about/fifa.png';
import kg from '~shared/assets/about/kg.jpg';
import msk from '~shared/assets/about/msk.jpg';
import sport from '~shared/assets/about/sport.jpg';
import about2 from '~shared/assets/about/about2.jpg';
import about3 from '~shared/assets/about/about3.png';
import about4 from '~shared/assets/about/about4.jpg';
import about5 from '~shared/assets/about/about5.jpg';
import about6 from '~shared/assets/about/about6.png';
import about7 from '~shared/assets/about/about7.jpg';
import about8 from '~shared/assets/about/about8.jpg';
import about9 from '~shared/assets/about/about9.jpg';
import about10 from '~shared/assets/about/about10.jpg';
import about11 from '~shared/assets/about/about11.jpg';
import about12 from '~shared/assets/about/about12.png';
import about13 from '~shared/assets/about/about13.jpg';
import about14 from '~shared/assets/about/about14.jpg';
import about15 from '~shared/assets/about/about15.jpg';
import about16 from '~shared/assets/about/about16.jpg';

// Extended years array with images
const years = [
  {
    year: 1967,
    title: 'Чон Джу Ен',
    text: 'В 1967 году основывает Hyundai Motor Company',
    image: ceo,
  },
  {
    year: 1968,
    title: 'Открытие завода в Ульсане',
    text: 'Hyundai заканчивает строительство своего первого завода. Сегодня на заводе работает более 34 000 человек и он выпускает более 5 600 автомобилей ежедневно.',
    image: about2,
  },
  {
    year: 1976,
    title: 'Запуск Hyundai Pony',
    text: 'Hyundai нанимает бывшего управляющего директора Austin Morris для руководства процессом разработки и запуска первого корейского легкового автомобиля Hyundai Pony',
    image: about3,
  },
  { year: 1983, text: 'Основание Hyundai Motor Canada.', image: Canada },
  {
    year: 1985,
    title: 'Hyundai Sonata',
    text: 'С конвейера сходит Hyundai Sonata 1 поколения, покорившая международный рынок',
    image: about4,
  },
  {
    year: 1990,
    title: 'Hyundai Elantra',
    text: 'Запуск 1-го поколения седана Hyundai Elantra',
    image: about5,
  },
  {
    year: 1991,
    title: '1991',
    text: 'Представлен Alpha, первый 1,5 - литровый двигатель Hyundai. С этого времени компания начинает выпускать на 100% корейские автомобили',
    image: about6,
  },
  {
    year: 1996,
    title: '',
    text: 'Совокупный выпуск превысил 10 миллионов автомобилей.',
    image: null,
  },
  {
    year: 1996,
    title: 'Запуск Equus',
    text: 'Компания представила свой первый полноразмерный премиальный седан. Основная цель — соперничать с Mercedes-Benz S-Class и BMW 7 Series',
    image: about7,
  },
  {
    year: 1999,
    title: 'Дизайн центр Hyundai',
    text: 'Открытие Европейского дизайн-центра Hyundai',
    image: about8,
  },
  {
    year: 2000,
    text: 'Компания стала официальным спонсором футбольных турниров, проводимых ФИФА и УЕФА.',
    image: fifa,
  },
  {
    year: 2001,
    title: 'Hyundai Tucson',
    text: 'Запуск первого в модельной линейке Hyundai компактного внедорожника Tucson',
    image: about9,
  },
  { year: 2005, text: 'Дебют в Interbrand ТОП-100.', image: null },
  {
    year: 2007,
    title: 'Основание Хендэ Мотор СНГ',
    text: 'Компания образована в 2007 году для импорта и дистрибуции автомобилей Hyundai',
    image: about10,
  },
  { year: 2008, text: 'Премиальный седан Hyundai Genesis был анонсирован в Сеуле.', image: null },
  { year: 2010, text: 'Премиальный седан Hyundai Genesis был анонсирован в Сеуле.', image: kg },
  {
    year: 2010,
    title:
      '26 февраля 2010 года состоялось торжественное открытие Hyundai Motor Company в Кыргызстане.',
    text: '26 февраля 2010 года состоялось торжественное открытие официального представительства Hyundai Motor Company в Кыргызстане. Мировой бренд на отечественном рынке будет представлять компания «Азиямоторс». По словам генерального директора компании «Азиямоторс» Юрия Лим, автомобильный рынок Кыргызстана перешел в фазу цивилизованного развития и этому способствует активная работа компании «Азиямоторс». «Открытие нового автосалона даст толчок для перехода на еще более высокий уровень развития автомобильного рынка КР», - отметил Юрий Лим во время торжественного открытия. «Именно автомобильный рынок является индикатором политической и экономической стабильности в республике. Поэтому нам стоит объединить и консолидировать усилия для его развития», - сказал Юрий Лим. Во время презентации Почетный консул Республики Корея в КР - Eom Kee Young отметил, что с открытием нового автоцентра у кыргызстанцев появится возможность лучше познакомиться с модельным рядом марки с мировым именем. «Сотрудничество Кыргызстана и Кореи активно развивается в сфере экономики, культуры и образования. А новый автоцентр Hyundai лишь только укрепит дружественные отношения между нашими странами», - сказал он.',
    image: null,
  },
  {
    year: 2010,
    title: 'Стартуют продажи Solaris',
    text: 'В России стартуют продажи Solaris — бестселлера российского рынка',
    image: about12,
  },
  {
    year: 2012,
    title: 'WRC Hyundai Motorsport',
    text: 'Hyundai объявила на Парижском автосалоне 2012 года, что намерена вернуться в WRC в 2014 году с моделью i20',
    image: about13,
  },
  {
    year: 2013,
    text: '5-е место среди автомобильных брендов в мире по количеству продаж.',
    image: null,
  },
  {
    year: 2014,
    title: 'Hyundai Motorstudio Seoul',
    text: 'Новая глава в развитии HYUNDAI была открыта в 2014 году с новаторской идеи создания специального пространства бренда — HYUNDAI MOTORSTUDIO Seoul\n',
    image: about14,
  },
  { year: 2014, text: 'Hyundai в Топ-40 самых дорогих брендов Interbrand.', image: null },
  { year: 2015, text: 'Открытие Hyundai Motorstudio Moscow.', image: msk },
  {
    year: 2016,
    title: 'Новый бренд Genesis',
    text: 'Hyundai представила седан G90 — первого представителя премиального суббренда Genesis.',
    image: about15,
  },
  { year: 2017, text: 'Презентация первой спортивной модели от Hyundai - i30 N.', image: sport },
  {
    year: 2017,
    title: 'Новый SANTA FE',
    text: 'Запуск абсолютно нового Hyundai SANTA FE',
    image: about16,
  },
];

const uniqueYears = Array.from(new Set(years.map((yearData) => yearData.year)));

export function AboutPage() {
  const [activeYear, setActiveYear] = useState(years[0].year);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let minDiff = Infinity;
      let currentYear = activeYear;

      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const diff = Math.abs(rect.top - window.innerHeight / 3); // Closest section to 1/3 of the screen

          if (diff < minDiff) {
            minDiff = diff;
            currentYear = years[index].year;
          }
        }
      });

      setActiveYear(currentYear);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeYear]);

  return (
    <>
      <SeoHelmet
        title="О бренде"
        descriptionKey="История Hyundai: от основания в 1967 году до мирового успеха. Развитие технологий, запуск моделей и глобальная экспансия бренда."
      />
      <div className="p-[60px_24px] w-full min-h-[80vh] h-full m-auto">
        <div className="flex">
          <ul className="sticky top-[60px] left-[30px] pt-[60px] h-fit sm:hidden">
            {uniqueYears.map((year) => (
              <li
                key={year}
                className={`text-2xl cursor-pointer list-none ${
                  activeYear === year ? 'font-medium text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => {
                  const section = sectionsRef.current[years.findIndex((y) => y.year === year)];

                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {year}
              </li>
            ))}
          </ul>
          <div className="w-full  max-w-[1024px] mx-auto grid grid-cols-12 sm:grid-cols-8 xs:grid-cols-4">
            <h1 className="col-span-12 sm:col-span-8 xs:col-span-4 text-center text-[40px] capitalize">
              История Hyundai Motor Company
            </h1>

            {years.map((yearData, index) => (
              <div
                key={yearData.year}
                ref={(el) => (sectionsRef.current[index] = el)}
                className="col-span-12 sm:col-span-8 xs:col-span-4 pt-20"
              >
                <h2 className="text-[20px] text-[#b7b7b7]">- {yearData.year}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-5 items-center">
                  {yearData?.image && (
                    <div className="col-span-1 mb-5">
                      <img
                        src={yearData.image}
                        alt={`Year ${yearData.year}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={yearData?.image ? 'col-span-1' : 'col-span-2'}>
                    <h3 className="text-[55px] my-5">{yearData.title || `Год ${yearData.year}`}</h3>
                    <p className="text-[22px]">{yearData.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-span-12 sm:col-span-8 xs:col-span-4 pt-10">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-5 items-center">
                <div className="col-span-2 sm:col-span-1 ">
                  <h2 className="text-[55px] my-5">Дальнейшее развитие</h2>
                  <p className="text-[22px]">
                    В 2019 Hyundai Motors ожидает очередной судьбоносный рывок в будущее. Усиливая
                    свои позиции в технологичности и качестве, увеличивая долю рынка, становясь
                    проводником новых услуг, мы предоставляем людям по всему миру новые возможности
                    наслаждаться вождением автомобилей Hyundai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
