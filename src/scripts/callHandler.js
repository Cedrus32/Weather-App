// & makes API calls, scrubs resolution data for DOM

async function callAPI(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=280aac734d9fdeeac311819cdc27c444`);
        const responseObject = await response.json();
        console.log(responseObject);
    } catch(error) {
        console.log(error);
    }
}

export default callAPI;
