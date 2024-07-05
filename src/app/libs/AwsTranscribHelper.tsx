export function clearTranscriptionItems(items){
    items.forEach((item, key) => {
        if(!item.start_time){
          const prevSentence = items[key - 1];
           prevSentence.alternatives[0].content += item.alternatives[0].content;
           delete item[key]
        }
      });
      return items.map((item: any) => {
        const {start_time, end_time} = item;
        const content = item.alternatives[0] .content;
        return{start_time, end_time, content}
      })
}