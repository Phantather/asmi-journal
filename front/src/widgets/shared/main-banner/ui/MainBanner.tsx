import banner from '~shared/assets/banner.jpg';

export const MainBanner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="h-[50vh]"
    >
      <div className="w-full h-full bg-[#202f5b90]"></div>
    </div>
  );
};
