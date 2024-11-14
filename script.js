
let array = [];
const arrayContainer = document.getElementById('array-container');

function generateArray() {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const value = Math.floor(Math.random() * 300) + 1;
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSorting() {
    const selectedAlgorithm = document.getElementById('algorithm').value;

    switch (selectedAlgorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'merge':
            await mergeSort(array, 0, array.length - 1);
            break;
        case 'quick':
            await quickSort(array, 0, array.length - 1);
            break;
        default:
            break;
    }
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
                await sleep(50);
            }
        }
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        swap(i, minIdx);
        bars[i].style.height = `${array[i]}px`;
        bars[minIdx].style.height = `${array[minIdx]}px`;
        await sleep(50);
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;
            await sleep(50);
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1]}px`;
        await sleep(50);
    }
}

async function mergeSort(arr, l, r) {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
    const bars = document.getElementsByClassName('array-bar');
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = [], R = [];
    for (let i = 0; i < n1; i++) L.push(arr[l + i]);
    for (let i = 0; i < n2; i++) R.push(arr[m + 1 + i]);
    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        bars[k].style.height = `${arr[k]}px`;
        await sleep(50);
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        bars[k].style.height = `${arr[k]}px`;
        await sleep(50);
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        bars[k].style.height = `${arr[k]}px`;
        await sleep(50);
        j++;
        k++;
    }
}

async function quickSort(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    const bars = document.getElementsByClassName('array-bar');
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(i, j);
            bars[i].style.height = `${arr[i]}px`;
            bars[j].style.height = `${arr[j]}px`;
            await sleep(50);
        }
    }
    swap(i + 1, high);
    bars[i + 1].style.height = `${arr[i + 1]}px`;
    bars[high].style.height = `${arr[high]}px`;
    await sleep(50);
    return i + 1;
}

function swap(i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

generateArray();
