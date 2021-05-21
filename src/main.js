const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
console.log("x");
console.log(x);
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "C", url: "https://css-tricks.com" },
  { logo: "J", url: "https://javascriptweekly.com" },
];
const simplifyUrl = (url) => {
  const match = url.match(/([a-zA-Z0-9]+\.[a-zA-Z0-9]+)(\/.*)?$/)
  if (match && match[1]) {
    return match[1];
  }
  return url;
  // return url
  //   .replace("https://", "")
  //   .replace("http://", "")
  //   .replace("www", "")
  //   .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node,index) => {
    const $li = $(`
    <li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
        <svg class="icon">
        <use xlink:href="#icon-close"></use>
        </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi);
    $li.on('click',()=>{
      window.open(node.url)
    })
    $li.on('click','.close',(e)=>{
      e.stopPropagation()
      hashMap.splice(index,1)
      render()
    })
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你想添加什么网站");
  if (url.indexOf("http") !== 0) {
    url = "http://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
$(document).on('keypress',(e)=>{
  const{key} = e
  for (let i = 0; i < hashMap.length; i++){
    if(hashMap[i].logo.tolowerCase() === key){
      window.open(hashMap[i].url)
    }
  }
})
