module.exports = function (app) {
    app.post('/map/location', function (req, res) {
        console.log(req.body)
        var lat = req.body.lat;
        var lng = req.body.lng;
        getGasStation(lat, lng);
    })
    function getGasStation(lat, lng){
        app.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=8500&type=gas_station&key='+ process.env.apiKey, function (res){
            console.log('results' + res)
            // var json = '';
            // res.on('data', function(chunk){
            //     json += chunk;
            // });
            // res.on('end', function(){
            //     try{
            //     var gasStations = JSON.parse(json);
            //     if (gasStations.status !== 'ok') throw new Error('API failed with status not ok')
            //     cb(gasStations.results.ma)
            //     }
            // })
        })
    }

}