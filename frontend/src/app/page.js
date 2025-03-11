import Image from "next/image";

export default function Home({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Component {...pageProps} /> */}
    </QueryClientProvider>
  );
}
