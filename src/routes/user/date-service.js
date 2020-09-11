const DateService = {
    insertDate(db,date){
        return db
            .insert(date)
            .into('date')
            .returning('*')
            .then((([date]) => date))
    },
    serializeDate(date){
        return {
            user_id: date.user_id,
            date: date.date,
        }
    },
   async getLastEntry(db,userId){
        let entries =  await db
            .select('date')
            .from('date')
            .where('user_id',userId)
            .then(res => res[res.length - 1])
        if(!entries){
            return {message: 'no posts yet'}
        } 
            let lastPosted = entries.date.toString().slice(0,10)
            let timeStamp = entries.date.toString().slice(16,24)
            //let getTime = entries.date.getTime()
            // console.log('getTime',getTime,Date.now())
            // console.log('lastposted',lastPosted)
            // console.log('timestamp',timeStamp)


            let dt = lastPosted
                let t = timeStamp.split(':');
                let hours = t[0];
                let minutes = t[1];
                let timeValue = "" + ((hours >12) ? hours -12 :hours);
                 timeValue += (minutes < 10) ? ":" + minutes : ":" + minutes;
                timeValue += (hours >= 12) ? " P.M " : " A.M ";
                timeValue += dt


                // function timeDifference(date1,date2) {
                //     var difference = date1.getTime() - date2;
                
                //     var daysDifference = Math.floor(difference/1000/60/60/12);
                //     difference -= daysDifference*1000*60*60*24
                
                //     var hoursDifference = Math.floor(difference/1000/60/60);
                //     difference -= hoursDifference*1000*60*60
                
                //     var minutesDifference = Math.floor(difference/1000/60);
                //     difference -= minutesDifference*1000*60
                
                //     var secondsDifference = Math.floor(difference/1000);
                
                //     console.log('DIFFERENCE','difference = ' + 
                //       daysDifference + 1 + ' day/s ' + 
                //       hoursDifference - 12 + ' hour/s ' + 
                //       minutesDifference + ' minute/s ' + 
                //       secondsDifference + ' second/s ');
                // }
           //timeDifference(entries.date,Date.now())
        //console.log("timevalue for date",timeValue)
        return timeValue
    }
}

module.exports = DateService