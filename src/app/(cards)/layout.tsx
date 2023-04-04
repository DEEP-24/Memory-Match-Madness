import { CardProvider } from '~/src/context/CardContext';

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return <CardProvider>{children}</CardProvider>;
}
