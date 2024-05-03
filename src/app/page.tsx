import ComputerManagementPage from "./(pages)/computer-management/page";

export default function Home() {
  return (
    <>
      {/* TODO: criar theme de acordo com o value vindo de theme-provider */}

      {/* <div className={`${theme} bg-background`}>
        <p>teste</p>
      </div> */}

      <ComputerManagementPage />
    </>
  );
}
