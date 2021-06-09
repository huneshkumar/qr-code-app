import React ,{useState,useRef}from 'react'
import {Flex,Stack,Text,Input,Button,Image} from '@chakra-ui/react'
import QRCode from 'qrcode'
import QrReader  from 'react-qr-reader'
const Home = () => {
    const [input,setInput]=useState()
    const [imageUrl,setImageUrl]=useState()
    const [scanResultFile,setScanResultFile]=useState()
    const qrRef=useRef(null)
    const handleErrorFile=(error)=>{
        console.log(error)
    }
    const onScanFile=()=>{
        qrRef.current.openImageDialog()
    }
    const handleScanFile=(result)=>{
        if(result){
            setScanResultFile(result)
        }
    }
    const generateQR= async ()=>{
        try{
            const response=await QRCode.toDataURL(input)
            setImageUrl(response)
            console.log(response)
        }
        catch(error){
            console.log(error)
        }
    }
    return (
       <Flex w="100%" display="flex" direction="row" justifyContent="center" alignItems="start">
           <Stack mt="10px" align="center" w="50%" spacing={5}>
               <Input onChange={(e)=>{setInput(e.target.value)}} w="90%" placeholder="Enter url" />
               <Button onClick={()=>{generateQR()}}>Generate</Button>
               <a href={imageUrl} download  ><Image  src={imageUrl} /></a>
           </Stack>
           <Stack  mt="10px" align="center" w="50%" spacing={5}>
                <Text>Scanner</Text>
                <Button onClick={onScanFile} >Upload</Button>
                <QrReader 
                ref={qrRef}
                delay={300}
                style={{width:'50%', height:"400px"}}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
                />
                <Text>Scanned Code: {scanResultFile}</Text>
           </Stack>

       </Flex>
    )
}

export default Home
