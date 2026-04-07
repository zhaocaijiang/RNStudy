/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import ToutiaoDianzan2 from './ToutiaoDianzan2';
import ToutiaoPinglun from './ToutiaoPinglun';
import ToutiaoShanchu from './ToutiaoShanchu';
import ToutiaoShouji from './ToutiaoShouji';
import ToutiaoLishi from './ToutiaoLishi';
import ToutiaoShoucang from './ToutiaoShoucang';
import ToutiaoShouye from './ToutiaoShouye';
import ToutiaoWode from './ToutiaoWode';
import ToutiaoGuanbi from './ToutiaoGuanbi';
import ToutiaoFenxiang from './ToutiaoFenxiang';
import ToutiaoWenda from './ToutiaoWenda';
import ToutiaoYanzhengma from './ToutiaoYanzhengma';
import ToutiaoSousuo from './ToutiaoSousuo';
import ToutiaoWuwangluo from './ToutiaoWuwangluo';
import ToutiaoYoujiantou from './ToutiaoYoujiantou';
import ToutiaoZuojiantou from './ToutiaoZuojiantou';
import ToutiaoShipin from './ToutiaoShipin';
import ToutiaoZuopin from './ToutiaoZuopin';
import ToutiaoYuedu from './ToutiaoYuedu';
export { default as ToutiaoDianzan2 } from './ToutiaoDianzan2';
export { default as ToutiaoPinglun } from './ToutiaoPinglun';
export { default as ToutiaoShanchu } from './ToutiaoShanchu';
export { default as ToutiaoShouji } from './ToutiaoShouji';
export { default as ToutiaoLishi } from './ToutiaoLishi';
export { default as ToutiaoShoucang } from './ToutiaoShoucang';
export { default as ToutiaoShouye } from './ToutiaoShouye';
export { default as ToutiaoWode } from './ToutiaoWode';
export { default as ToutiaoGuanbi } from './ToutiaoGuanbi';
export { default as ToutiaoFenxiang } from './ToutiaoFenxiang';
export { default as ToutiaoWenda } from './ToutiaoWenda';
export { default as ToutiaoYanzhengma } from './ToutiaoYanzhengma';
export { default as ToutiaoSousuo } from './ToutiaoSousuo';
export { default as ToutiaoWuwangluo } from './ToutiaoWuwangluo';
export { default as ToutiaoYoujiantou } from './ToutiaoYoujiantou';
export { default as ToutiaoZuojiantou } from './ToutiaoZuojiantou';
export { default as ToutiaoShipin } from './ToutiaoShipin';
export { default as ToutiaoZuopin } from './ToutiaoZuopin';
export { default as ToutiaoYuedu } from './ToutiaoYuedu';

export type IconNames = 'toutiao-tubiao_dianzan' | 'toutiao-dianzan2' | 'toutiao-pinglun' | 'toutiao-shanchu' | 'toutiao-shouji' | 'toutiao-lishi' | 'toutiao-shoucang' | 'toutiao-shouye' | 'toutiao-wode' | 'toutiao-guanbi' | 'toutiao-fenxiang' | 'toutiao-wenda' | 'toutiao-yanzhengma' | 'toutiao-sousuo' | 'toutiao-wuwangluo' | 'toutiao-youjiantou' | 'toutiao-zuojiantou' | 'toutiao-shipin' | 'toutiao-zuopin' | 'toutiao-yuedu';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'toutiao-dianzan2':
      return <ToutiaoDianzan2 key="2" {...rest} />;
    case 'toutiao-pinglun':
      return <ToutiaoPinglun key="3" {...rest} />;
    case 'toutiao-shanchu':
      return <ToutiaoShanchu key="4" {...rest} />;
    case 'toutiao-shouji':
      return <ToutiaoShouji key="5" {...rest} />;
    case 'toutiao-lishi':
      return <ToutiaoLishi key="6" {...rest} />;
    case 'toutiao-shoucang':
      return <ToutiaoShoucang key="7" {...rest} />;
    case 'toutiao-shouye':
      return <ToutiaoShouye key="8" {...rest} />;
    case 'toutiao-wode':
      return <ToutiaoWode key="9" {...rest} />;
    case 'toutiao-guanbi':
      return <ToutiaoGuanbi key="10" {...rest} />;
    case 'toutiao-fenxiang':
      return <ToutiaoFenxiang key="11" {...rest} />;
    case 'toutiao-wenda':
      return <ToutiaoWenda key="12" {...rest} />;
    case 'toutiao-yanzhengma':
      return <ToutiaoYanzhengma key="13" {...rest} />;
    case 'toutiao-sousuo':
      return <ToutiaoSousuo key="14" {...rest} />;
    case 'toutiao-wuwangluo':
      return <ToutiaoWuwangluo key="15" {...rest} />;
    case 'toutiao-youjiantou':
      return <ToutiaoYoujiantou key="16" {...rest} />;
    case 'toutiao-zuojiantou':
      return <ToutiaoZuojiantou key="17" {...rest} />;
    case 'toutiao-shipin':
      return <ToutiaoShipin key="18" {...rest} />;
    case 'toutiao-zuopin':
      return <ToutiaoZuopin key="19" {...rest} />;
    case 'toutiao-yuedu':
      return <ToutiaoYuedu key="20" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
