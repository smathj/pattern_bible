/**
 *  읽기를 마치면 : end
 *  쓰기를 마치면 : finish
 *
 *  non-flowing 모드 : 버퍼가 채워질때마다 동작
 */

process.stdin
    .on('readable', () => {
        let chunk;
        console.log('New data available')
        while((chunk = process.stdin.read()) != null) {
            console.log(`Chunk read (${chunk.length} bytes: "${chunk.toString()}"`);
        }
    })
    .on('end', () => console.log('End of stream'))
