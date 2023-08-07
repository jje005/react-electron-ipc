import Chart from 'chart.js'; // npm에서 chart.js 패키지를 설치해야 합니다.

let intervalId = null;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const homeButton = document.getElementById('homeButton');

const ctx = document.getElementById('myChart').getContext('2d');
let myChart = null;
let dataCount = 0;

// Sin 곡선 그래프를 그리는 함수
function drawSinGraph() {
  const data = {
    labels: [], // x축 데이터를 빈 배열로 초기화합니다.
    datasets: [{
      label: 'Sin 곡선',
      data: [], // y축 데이터를 빈 배열로 초기화합니다.
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false
    }]
  };

  const options = {
    responsive: true,
    animation: false,
    scales: {
      y: {
        min: -127,
        max: 128
      }
    },
    plugins: {
      legend: {
        display: false // 범례 숨기기
      }
    }
  };

  // 재시작 위해서 stop 후 시작 시 myChart 삭제함
  if (myChart) {
    myChart.destroy();
  }

  // Chart 객체를 생성해서 Sin 곡선 그래프를 그립니다.
  myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });

  // 10ms 주기로 Sin 곡선 데이터를 갱신
  intervalId = setInterval(() => {
    const xValue = (Math.floor(dataCount))*0.01; // x축 데이터로 0.01 간격으로 증가 (0, 0.01, 0.02, ...)
    const yValue = Math.sin(xValue * Math.PI * 2) * 128; // Sin 곡선의 y값 계산
    myChart.data.datasets[0].data.push(yValue);
    myChart.data.labels.push(xValue);

    // 데이터 갯수 카운트 증가
    dataCount++;

    // 그래프 데이터가 40개를 초과하면 최근 데이터부터 삭제
    if (myChart.data.datasets[0].data.length > 40) {
      myChart.data.datasets[0].data.shift();
      myChart.data.labels.shift();
    }
    myChart.update();
  }, 100); // 10ms 주기로 변경
}

// 시작 버튼 클릭 시 Sin 곡선 그래프 생성
startButton.addEventListener('click', () => {
  if (!intervalId) {
    drawSinGraph();
    startButton.disabled = true;
  }
});

// 멈춰 버튼 클릭 시 그래프 정지
stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  startButton.disabled = false;
});

homeButton.addEventListener('click', () => {
  window.location.href = './index.html';
});