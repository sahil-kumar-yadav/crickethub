import Image from "next/image";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from "@/utils/queryClient";

export default function Home({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
