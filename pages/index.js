import Head from 'next/head';
import CountryInfo from '../components/countryInfo';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

export async function getServerSideProps() {
    const res = await axios.get('https://api.covid19api.com/summary')
    const data = await res.data;
    return {
        props: { data }
    }
}

export default function Home({ data }) {

  return (
    <>
    <Head>
        <title>Covid-19 Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="Covid19 Tracker" />
        <meta name="keywords" content="covid19, corona, tracker, covid19 tracker, corona tracker, virus" />
    </Head>
    <main>
        <Header data={data.Global} />
        <CountryInfo data={data.Countries}/>
        <Footer />
    </main>
    </>
  )
}
