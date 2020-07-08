/*
    JavaScript source for the CoinPot Faucet Utility page.
*/

document.addEventListener('DOMContentLoaded', function()
{
    function storePreferences()
    {
        var key="preferences",
            preferenceTable = {
                'mbtc': document.querySelector("#mbtc").checked,
                'mdoge': document.querySelector("#mdoge").checked,
                'mltc': document.querySelector("#mltc").checked,
                'mbcc': document.querySelector("#mbcc").checked,
                'mdash': document.querySelector("#mdash").checked,
                'bitfun': document.querySelector("#bitfun").checked,
                'bonusbtc': document.querySelector("#bonusbtc").checked
           };
        var Container = {};
        Container[key] = preferenceTable 
        chrome.storage.sync.set(Container, function(){
            //console.log("Saved file ",preferenceTable);
        });
   }

   const buttons = document.querySelectorAll('input');
   for(const button of buttons)
   {
       button.addEventListener('change', function()
       {
        storePreferences();
       });
   }

   document.getElementById('launch').addEventListener('click', function()
   {
    for(const button of buttons)
    {
        if(button.checked)
        {
            var newURL = button.getAttribute('data-target');
            chrome.tabs.create({url: newURL});
        }
    }
   });

    loadsettings();
    setInterval(storePreferences, 3000);
})

function loadsettings()
{
    try{
        chrome.storage.sync.get("preferences", function(data){
            try{
                for(const [key,value] of Object.entries(data["preferences"])){
                    document.querySelector("#"+key).checked = value;
                }
            } catch(err) {
                console.log("[ERROR]: "+err.message);
            }
            
        })
    }catch(err){
        console.log("[ERROR]: "+err.message);
    }
}