'use client'
// 'use server'

const IpInfoApiToken = process.env.NEXT_PUBLIC_IPINFO_API_TOKEN
console.log(IpInfoApiToken)

export const getUserLocation = async (): Promise<{ country: string; region: string }> => {
  try {
    console.log('Fetching location')
    const response = await fetch(`https://ipinfo.io/json?token=${IpInfoApiToken}`);
    const data = await response.json();
    console.log('location fetched: ',data)
    return { country: data.country, region: data.region };
  } catch (error) {
    console.error('Error fetching location:', error);
    return { country: 'DEFAULT', region: '' };
  }
};

