import edu from './education.json';
export default function Education() {
    return (
        <>
        <h1 className="text-center shrink items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl overflow-auto">EDUCATION</h1>
            <section className="text-gray-300 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="-my-8 divide-y-2 divide-gray-100">
                        {edu.map((item, index) => (
                            <div key={index} className="py-8 flex flex-wrap md:flex-nowrap">
                                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                    <span className="font-semibold title-font text-gray-200">{item.category}</span>
                                    <span className="mt-1 text-gray-500 text-sm">{item.date}</span>
                                </div>
                                <div className="md:flex-grow">
                                    <h2 className="text-2xl font-medium text-gray-100 title-font mb-2">{item.title}</h2>
                                    <p className="leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
};