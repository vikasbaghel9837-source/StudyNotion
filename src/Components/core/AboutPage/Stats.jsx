import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return (
    <section>
        <div className='bg-richblack-800 p-16'>
            <div className='flex justify-evenly text-richblack-25 text-center'>
                {
                    Stats.map( (data, index) => {
                        return (
                            <div key={index} className='flex flex-col gap-2'>
                                <h1 className='font-bold text-2xl'>
                                    {data.count}
                                </h1>
                                <h2 className='text-richblack-500 font-bold'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
