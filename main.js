import "./style.css";

let container = document.getElementById("bars_container");
let generate_btn = document.getElementById("generate_btn");
let bubblesort_btn = document.getElementById("bubblesort_btn");
let selectionsort_btn = document.getElementById("selectionsort_btn");
let mergesort_btn = document.getElementById("mergesort_btn");
let quicksort_btn = document.getElementById("quicksort_btn");
let dim = document.getElementById("bars_count");
let swap_counter = document.getElementById("swap_counter");

let array = [];
let delay = 10;
let swap = 0;

function update_bars(array) {
  container.innerHTML = "";
  swap_counter.innerHTML = `Swaps: ${swap}`;
  array.forEach((bar) => {
    let bar_element = document.createElement("div");
    bar_element.classList.add("bar");
    bar_element.style.height = `${bar}%`;
    bar_element.style.width = `${
      container.getBoundingClientRect().width / array.length
    }%`;
    container.append(bar_element);
  });
}

generate_btn.onclick = () => {
  container.innerHTML = "";
  array = [];
  swap = 0;
  if (dim.value <= 1) {
    alert("Add at least two bars");
  }
  for (let _ = 0; _ < dim.value; _++) {
    array[_] = Math.floor(Math.random() * 100);
  }
  array.forEach((number) => {
    console.log(number);
  });
  update_bars(array);
};

bubblesort_btn.onclick = async () => {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swap++;
        await new Promise((resolve) => setTimeout(resolve, delay));
        update_bars(array);
      }
    }
  }
};

selectionsort_btn.onclick = async () => {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min_idx]) {
        min_idx = j;
      }
    }
    let temp = array[min_idx];
    array[min_idx] = array[i];
    array[i] = temp;
    swap++;
    await new Promise((resolve) => setTimeout(resolve, delay));
    update_bars(array);
  }
};

mergesort_btn.onclick = async () => {
  async function merge(start, mid, end) {
    let start2 = mid + 1;
    if (array[mid] <= array[start2]) {
      return;
    }
    while (start <= mid && start2 <= end) {
      if (array[start] <= array[start2]) {
        start++;
      } else {
        let value = array[start2];
        let index = start2;
        while (index !== start) {
          array[index] = array[index - 1];
          index--;
        }
        array[start] = value;
        swap++;
        start++;
        mid++;
        start2++;
        await new Promise((resolve) => setTimeout(resolve, delay));
        update_bars(array);
      }
    }
  }

  async function mergeSort(start, end) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      await mergeSort(start, mid);
      await mergeSort(mid + 1, end);
      await merge(start, mid, end);
    }
  }

  await mergeSort(0, array.length - 1);
};

quicksort_btn.onclick = async () => {
  async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      if (array[j] < pivot) {
        i++;
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        swap++;
        await new Promise((resolve) => setTimeout(resolve, delay / 2));
        update_bars(array);
      }
    }
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    swap++;
    await new Promise((resolve) => setTimeout(resolve, delay / 2));
    update_bars(array);
    return i + 1;
  }

  async function quickSort(low, high) {
    if (low < high) {
      let pi = await partition(low, high);
      await quickSort(low, pi - 1);
      await quickSort(pi + 1, high);
    }
  }

  await quickSort(0, array.length - 1);
};
