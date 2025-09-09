import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';
import { useEffect, useState } from 'react';

import { Router } from '~pages';
import { useNotification, useWindowInnerWidth } from '~shared/ui';

import { withProviders } from './providers';
import { AppProps } from './types';

import './styles/antd.scss';
import { COLORS } from './styles/colors';
import './styles/fontFamily.scss';
import './styles/index.scss';
import './styles/tailwind.scss';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const App: React.FC<AppProps> = () => {
  const [innerHigth, setInnerHigth] = useState<number | string>('100%');
  const windowWidth = useWindowInnerWidth();
  const notification = useNotification();

  useEffect(() => {
    if (windowWidth <= 768) {
      setInnerHigth(window.innerHeight);
    }
  }, [windowWidth]);

  const antdTheme = {
    components: {
      Button: {
        fontSize: 15,
        colorBgContainerDisabled: COLORS.disabled,
        colorTextDisabled: COLORS.stroke,
        borderRadiusLg: 15,
        controlHeight: 34,
      },
      List: {
        colorBorder: COLORS.stroke,
      },
      Avatar: {
        colorTextPlaceholder: COLORS.gray,
      },
      Tabs: {
        colorBorderSecondary: COLORS.gray,
        margin: 0,
      },
      Tag: {
        fontSize: 15,
        fontSizeIcon: 14,
        padding: 8,
        fontSizeSM: 15,
        // borderRadiusSM: 0,
        marginXS: 0,
      },
      Input: {
        colorBgContainerDisabled: COLORS.disabled,
        colorTextDisabled: COLORS.stroke,
        fontSize: 15,
      },
      DatePicker: {
        colorIcon: COLORS.primary,
        fontSize: 15,
      },
      Typography: {
        // fontFamilyCode: "'Poppins', 'sans-serif' ",
        fontSize: 15,
        lineHeight: 1.2,
        verticalAlign: 'center',
        colorLink: COLORS.black,
        colorLinkHover: COLORS.black,
        colorLinkActive: COLORS.black,
      },
      Breadcrumb: {
        fontSize: 12,
      },
      Divider: {
        margin: 0,
      },
      Image: {
        colorBgMask: 'rgba(0, 0, 0, 0.7)',
        colorTextLightSolid: COLORS.white,
        marginXL: 15,
      },
    },
    token: {
      titleMarginTop: '0',
      titleMarginBottom: '0',
      colorFillAlter: COLORS.white,
      borderRadius: 8,
      controlHeightLG: 50,
      controlPaddingHorizontal: 24,
      paddingSM: 24,
      paddingContentHorizontal: 15,
      colorPrimary: COLORS.primary,
      colorError: COLORS.red,
      colorText: COLORS.black,

      colorBorder: COLORS.stroke,
      colorTextPlaceholder: COLORS.stroke,
      colorTextQuaternary: COLORS.stroke,
      colorIconHover: COLORS.primary,
    },
  };

  return (
    <div style={{ maxHeight: innerHigth }} className="h-full">
      <ConfigProvider theme={antdTheme} locale={ru_RU}>
        <Router />
      </ConfigProvider>
      {notification.contextHolder}
    </div>
  );
};

const ProvidedApp: React.FC<AppProps> = withProviders(App);

export { ProvidedApp as App };
