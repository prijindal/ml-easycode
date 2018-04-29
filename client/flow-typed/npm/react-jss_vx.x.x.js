declare module 'react-jss' {
  // Export these
  declare export type FunctionComponent<P> = (props: P) => ?React$Element<any>;
  declare export type ClassComponent<P, S> = Class<React$Component<P, S>>;

  declare type Klasses<CSS> = {
    [classname: $Keys<CSS>]: string,
  };

  declare export type JSSProps<CSS> = {
    classes: Klasses<CSS>,
    sheet: {
      attached: boolean,
      classes: Klasses<CSS>,
      deployed: boolean,
      linked: boolean,
      options: Object,
      renderer: mixed,
      rules: mixed,
    },
  };

  declare type Injector = {
    <Props, State, CSS>(
      component: ClassComponent<Props, State>
    ): ClassComponent<$Diff<Props, JSSProps<CSS>>, void>,
    <Props, CSS>(
      component: FunctionComponent<Props>
    ): FunctionComponent<$Diff<Props, JSSProps<CSS>>>,
  };

  declare export default function injectSheet<Props, State, CSS>(
    CSS: CSS
  ): Injector;
}
