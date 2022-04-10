/**
 *  읽기를 마치면 : end
 *  쓰기를 마치면 : finish
 *
 *  flowing 모드 : 데이터가 들어올때마다 동작
 */

process.stdin
    .on('data', (chunk) => {
        console.log('New data available')
        console.log(`Chunk read (${chunk.length} bytes: "${chunk.toString()}"`);
    })
    .on('end', () => console.log('End of stream'))