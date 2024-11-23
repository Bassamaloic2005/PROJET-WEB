
var bouton= document.getElementById('afficher')

var textare=document.getElementById('textarea')

var downloa=document.getElementById('download')



bouton.addEventListener("click",()=>{
    
    var fileInput= document.getElementById('fichier')
    const file= fileInput.files[0]
    const reader=new FileReader()

    reader.onload=function(e){
        //je mets dans un tableau particulier (pour work sur les binaires)
        var tab=new Uint8Array(e.target.result)
        //on lit les données et ca renvoie un wokrbook(feuille Excel)
        const workbook= XLSX.read(tab,{type:'array'})
        //obtenir le premier nom de la feuille
        const firsheet= workbook.SheetNames[0]
        //access au premier nom de la feuille
        const worksheet= workbook.Sheets[firsheet]
        const jsondata= XLSX.utils.sheet_to_json(worksheet)
        console.log(jsondata)
      
       
const newjsondata= jsondata.filter((elem)=>{
if(elem.description.includes("utilisateur")){
   elem.nom = elem.description.slice(14,elem.description.length-21)

return elem
}
})
const arrays = newjsondata.map(objet => Object.values(objet));
const entete=["id","description","date","noms"]
const tabfin=[entete,...arrays]
console.log('new:',tabfin)
//creation du fichier a download
const ws= XLSX.utils.aoa_to_sheet(tabfin)
const wb=XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb,ws,'feuille1')
XLSX.writeFile(wb," newfile.xlsx")

console.log(wb)


    textare.textContent=JSON.stringify(newjsondata)
    downloa.addEventListener("click",()=>{
        download('new.xlsx',wb)
    })
 
    }

reader.readAsArrayBuffer(file)
    })
    function download(file,data) {
    
        const blob= new Blob([data],{type:'text/csv;charset=utf8;'})
        const link= document.createElement('a')
        link.setAttribute('href',URL.createObjectURL(blob))
        link.setAttribute('download',file)
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link);
    }

