//Left-menu auto set when className is active
tablinks = document.getElementsByClassName("tab-menu-left");
for (i = 0; i < tablinks.length; i++) {
tablinks[i].className = tablinks[i].className;
    if(tablinks[i].className.includes("active")){
        var idContentLeftMenu = tablinks[i].dataset.actionmenu;
        document.getElementById(idContentLeftMenu).style.display = "block";
    }
}