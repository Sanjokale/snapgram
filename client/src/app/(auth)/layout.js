export default function AuthLayout({ children }) {
  return (
    <>
      <section className="flex justify-center items-center flex-col py-10">
        {children}

        {/* <img
          src="/assets/images/side-img.svg"
          alt="logo"
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
        /> */}
      </section>
    </>
  );
}
