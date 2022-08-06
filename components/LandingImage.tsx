function LandingImage() {
    return(
        <div className='flex max-w-7xl justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0 mx-auto'>
            <div className='px-10 space-y-5'>
                <h1 className='text-6xl max-w-xl font-serif'><span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read, and connect</h1>
                <h2>It&apos;s easy and free to post your thinking on any topic and connect with millions of readers.</h2>

            </div>
            <img
                className='hidden md:inline-flex md:h-40 lg:h-full'
                src={"https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"} alt={"M"}
            />

        </div>
    )

}

export default LandingImage;