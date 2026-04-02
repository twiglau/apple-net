
function SlowItem({counter}: {counter: number}) {
    let startTime = performance.now();
    while (performance.now() - startTime < 1) {
        // do nothing, just waste time
    }

    return (
        <li>{counter}</li>
    )
}


export default SlowItem;