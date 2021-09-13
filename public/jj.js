
       
       fetch("/users/", {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({userObject})//convert an object to JSON respresentive string
       }).then(res => {
           res.json().then(response => {
               if (Math.floor(res.status / 100) !== 2) {
                   alert("Error: " + response[0].message)
               } else {
                   console.log('success: ', response)
               }
           }
           )
       }).catch(err => {
           console.log('err: ', err);
       })
   
   
   