import Image from "next/image";

export const Banner = () => {
    return (
        <div className="p-6 mx-auto bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 md:max-w-2xl lg:max-w-4xl w-[15rem] md:w-[60rem]"> {/* Added max-width */}
            <div className="shrink-0 mb-2">
                School Logo
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-medium text-teal-600">Admission</h1>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed md:leading-normal">
                    We are excited to announce that admissions for the upcoming academic year are now open!
                    Join our vibrant community and take the first step towards a bright future.
                    Apply now to secure your spot and become a part of our esteemed institution.
                </p>
            </div>
        </div>
    );
};