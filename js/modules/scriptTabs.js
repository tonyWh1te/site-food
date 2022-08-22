function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activClass
) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  hideTabContent();
  showTabContent();

  function hideTabContent() {
    tabsContent.forEach((tabCon) => {
      tabCon.classList.add('hide');
      tabCon.classList.remove('show', 'fade');
    });

    tabs.forEach((tabBtn) => tabBtn.classList.remove(activClass));
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activClass);
  }

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;
