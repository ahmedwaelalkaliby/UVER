import Image from "next/image";
  

function MobileMockup() {
  return (
    <div
      id="device"
      className=" relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className=" overflow-hidden   bg-white dark:bg-gray-800">
        <Image
          src="/mobileImage.png"
          fill
          className="rounded-2xl"
          alt="mobile screen"
        />
      </div>
    </div>
  );
}
export default MobileMockup;
