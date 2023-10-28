<template>
    <table class="long-tbl w-[2000px] text-sm text-left text-gray-500 dark:text-gray-400 border shadow-xl">
                <tbody v-for="(item, index) in 4" :key="index" >
                    <tr class="border-b">
                    <td scope="col" class="px-6  h-12 skeleton" style="width:3%">
                      
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:8%">
                      
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton" style="width:8%">
                       
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton" style="width:10%">
                        
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:7%">
                        
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:7%">
                       
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton" >
                        
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:5%">
                       
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:8%">
                     
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:4%">
                        
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:10%">
                     
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:10%">
                       
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:5%">
                      
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton"  style="width:8%">
                       
                    </td>
                    <td scope="col" class="px-6  h-12 skeleton">
                       
                    </td>
                </tr>
                </tbody>
    </table>
    </template>
    
    <script setup>
    
    </script>
    
    
    <style scoped>
    .long-tbl {
    table-layout: fixed;
}

    .skeleton {
      position: relative;
      overflow: hidden;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    </style>