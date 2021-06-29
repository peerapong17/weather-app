import React, { useState } from 'react';
import Head from 'next/head'
import { async } from 'regenerator-runtime';

export default function Home({ weatherData }) {
  const [input, setInput] = useState('')
  const [data, setData] = useState()

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const fetchData = async (e) => {
    e.preventDefault()
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=ca0873a42d04802307eab7bfa6d10f75&units=metric`)
    const data = await res.json()
    setData(data)
    setInput('')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form className="mb-30" onSubmit={(e) => fetchData(e)}>
        <input value={input} onChange={(e) => setInput(e.target.value)} autoFocus className="px-8 py-3 mr-3 border-4 border-indigo-200 rounded-md focus:border-indigo-700 hover:border-indigo-300 outline-none" type="text" />
        <input value="Search" className="bg-indigo-300 hover:bg-indigo-400 active:bg-indigo-500 px-8 py-4 rounded-md cursor-pointer" type="submit" />
        <div className="mt-4 mb-20 date text-2xl font-mono text-center">{dateBuilder(new Date())}</div>
      </form>


      <div className="flex flex-col items-center">
        
        <div className="mb-12 text-5xl font-sans font-semibold tracking-wide">{data ? data.name : weatherData.name}</div>
        <div className="px-24 py-14 bg-blue-100 rounded-md shadow-xl">
          <div className="text-6xl font-mono font-bold">{data ? Math.round(data.main.temp) : Math.round(weatherData.main.temp)}°C</div>
        </div>
      </div>




    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=bangkok&appid=${process.env.API_KEY}&units=metric`)
  const data = await res.json()
  console.log(data)

  return {
    props: {
      weatherData: data
    }
  }
}
