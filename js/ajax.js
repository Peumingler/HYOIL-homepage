// HTML을 ajax로 가져오는 function
export default function gethtml(filename) {
    return new Promise((resolve, reject) => {
        fetch("/template/" + filename) // (/test.json) 호출 (GET)
            .then(e => e.text()) // 비동기
            .then(text => resolve(text)); // 비동기
    });
}