var getalEen = 0;
var getalTwee = 0;
var antwoord = 0;
var chance = 0;

$("#plus").click(function() {
    getalEen = $('#getalnr1').val()
    getalTwee = $('#getalnr2').val()
    getalEen = parseInt(getalEen)
    getalTwee = parseInt(getalTwee)
    antwoord = getalEen + getalTwee
    $("#answer").html(antwoord);
})

$("#min").click(function() {
    getalEen = $('#getalnr1').val()
    getalTwee = $('#getalnr2').val()
    getalEen = parseInt(getalEen)
    getalTwee = parseInt(getalTwee)
    antwoord = getalEen - getalTwee
    $("#answer").html(antwoord);
})

$("#keer").click(function() {
    getalEen = $('#getalnr1').val()
    getalTwee = $('#getalnr2').val()
    getalEen = parseInt(getalEen)
    getalTwee = parseInt(getalTwee)
    antwoord = getalEen * getalTwee
    $("#answer").html(antwoord);
})

$("#deel").click(function() {
    getalEen = $('#getalnr1').val()
    getalTwee = $('#getalnr2').val()
    getalEen = parseInt(getalEen)
    getalTwee = parseInt(getalTwee)
    antwoord = getalEen / getalTwee
    $("#answer").html(antwoord);
})


//Checklist

$(document).ready(function() {

    loadItems();

    $('#addItem').click(function() {
        addItem();
    });


    $('#itemInput').keypress(function(e) {
        if (e.which === 13) {  //13 is enter
            addItem();
        }
    });

    function loadItems() {
        const savedItems = JSON.parse(localStorage.getItem('checklist')) || [];
        savedItems.forEach(function(item) {
            const listItem = createListItem(item.text, item.checked);
            $('#checklist').append(listItem);
        });
    }

    function createListItem(text, isChecked = false) {
        const $listItem = $('<li></li>');
        const $checkbox = $('<input type="checkbox">').prop('checked', isChecked);
        const $label = $('<span></span>').text(text);
        const $removeButton = $('<button class="remove">Remove</button>');

        if (isChecked) {
            $listItem.addClass('checked');
        }

        $checkbox.change(function() {
            $listItem.toggleClass('checked', $checkbox.prop('checked'));
            updateLocalStorage();
        });

        $removeButton.click(function() {
            $listItem.remove();
            updateLocalStorage();
        });


        $listItem.append($checkbox).append($label).append($removeButton);

        return $listItem;
    }


    function addItem() {
        const itemText = $('#itemInput').val().trim();
        if (itemText) {
            const listItem = createListItem(itemText);
            $('#checklist').append(listItem);
            $('#itemInput').val('');  //clear input
            updateLocalStorage();
        } else {
            console.log("Item text is empty.");
        }
    }

    function updateLocalStorage() {
        const items = [];
        $('#checklist li').each(function() {
            const $checkbox = $(this).find('input[type="checkbox"]');
            const text = $(this).find('span').text();
            items.push({ text: text, checked: $checkbox.prop('checked') });
        });

        localStorage.setItem('checklist', JSON.stringify(items));
    }
});





//Number to letters



$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const cost = urlParams.get("cost");
    if (cost) {
        $("#numberInput").val(cost);
    }
    
    $("#convertBtn").click(function() {
        let numStr = $("#numberInput").val().trim();

        if (!numStr) {
            $("#result").text("Invalid or decimal number");
            return;
        }

        let words = convertNumberToWords(numStr);
        $("#result").text(words);
    });
});

let useLongScale = false;

$("#scaleToggle").change(function() {
    useLongScale = this.checked;
    console.log("Use Long Scale:", useLongScale);
});

function convertNumberToWords(numStr) {
    try {
        console.log("Original Input:", numStr);

        if (numStr.toLowerCase().includes("e")) {
            numStr = expandScientificNotation(numStr);
            console.log("Expanded Scientific Notation:", numStr);
        }

        let num = BigInt(numStr);
        if (num < 1000n) return num.toString();


        let shortScale = [
            "", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion",
            "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion",
            "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion",
            "septendecillion", "octodecillion", "novemdecillion", "vigintillion", "unvigintillion",
            "duovigintillion", "trevigintillion", "quattuorvigintillion", "quinvigintillion",
            "sexvigintillion", "septenvigintillion", "octovigintillion", "novemvigintillion",
            "trigintillion", "untrigintillion", "duotrigintillion", "tretrigintillion",
            "quattuortrigintillion", "quintrigintillion", "sextrigintillion", "septentrigintillion",
            "octotrigintillion", "novemtrigintillion", "quadragintillion", "unquadragintillion",
            "duoquadragintillion", "trequadragintillion", "quattuorquadragintillion",
            "quinquadragintillion", "sexquadragintillion", "septenquadragintillion",
            "octoquadragintillion", "novemquadragintillion", "quinquagintillion", "unquinquagintillion",
            "duoquinquagintillion", "trequinquagintillion", "quattuorquinquagintillion",
            "quinquinquagintillion", "sexquinquagintillion", "septenquinquagintillion",
            "octoquinquagintillion", "novemquinquagintillion", "sexagintillion", "unsexagintillion",
            "duosexagintillion", "treexagintillion", "quattuorsexagintillion", "quinsexagintillion",
            "sexsexagintillion", "septensexagintillion", "octosexagintillion", "novemsexagintillion",
            "septuagintillion", "unseptuagintillion", "duoseptuagintillion", "treeptuagintillion",
            "quattuorseptuagintillion", "quinseptuagintillion", "sexseptuagintillion",
            "septenseptuagintillion", "octoseptuagintillion", "novemseptuagintillion",
            "octogintillion", "unoctogintillion", "duooctogintillion", "treoctogintillion",
            "quattuoroctogintillion", "quinoctogintillion", "sexoctogintillion", "septenoctogintillion",
            "octooctogintillion", "novemoctogintillion", "nonagintillion", "unnonagintillion",
            "duononagintillion", "trenonagintillion", "quattuornonagintillion", "quinnonagintillion",
            "sexnonagintillion", "septennonagintillion", "octononagintillion", "novemnonagintillion",
            "centillion"
        ];


        let longScale = [
            "", "thousand", "million", "milliard", "billion", "billiard", "trillion",
            "trilliard", "quadrillion", "quadrilliard", "quintillion", "quintilliard",
            "sextillion", "sextilliard", "septillion", "septilliard", "octillion",
            "octilliard", "nonillion", "nonilliard", "decillion", "decilliard",
            "undecillion", "undecilliard", "duodecillion", "duodecilliard",
            "tredecillion", "tredecilliard", "quattuordecillion", "quattuordecilliard",
            "quindecillion", "quindecilliard", "sexdecillion", "sexdecilliard",
            "septendecillion", "septendecilliard", "octodecillion", "octodecilliard",
            "novemdecillion", "novemdecilliard", "vigintillion", "vigintilliard",
            "unvigintillion", "unvigintilliard", "duovigintillion", "duovigintilliard",
            "trevigintillion", "trevigintilliard", "quattuorvigintillion",
            "quattuorvigintilliard", "quinvigintillion", "quinvigintilliard",
            "sexvigintillion", "sexvigintilliard", "septenvigintillion",
            "septenvigintilliard", "octovigintillion", "octovigintilliard",
            "novemvigintillion", "novemvigintilliard", "trigintillion", "trigintilliard",
            "untrigintillion", "untrigintilliard", "duotrigintillion", "duotrigintilliard",
            "tretrigintillion", "tretrigintilliard", "quattuortrigintillion",
            "quattuortrigintilliard", "quintrigintillion", "quintrigintilliard",
            "sextrigintillion", "sextrigintilliard", "septentrigintillion",
            "septentrigintilliard", "octotrigintillion", "octotrigintilliard",
            "novemtrigintillion", "novemtrigintilliard", "quadragintillion",
            "quadragintilliard", "unquadragintillion", "unquadragintilliard",
            "duoquadragintillion", "duoquadragintilliard", "trequadragintillion",
            "trequadragintilliard", "quattuorquadragintillion", "quattuorquadragintilliard",
            "quinquadragintillion", "quinquadragintilliard", "sexquadragintillion",
            "sexquadragintilliard", "septenquadragintillion", "septenquadragintilliard",
            "octoquadragintillion", "octoquadragintilliard", "novemquadragintillion",
            "novemquadragintilliard", "quinquagintillion", "quinquagintilliard"
        ];


        let suffixes = useLongScale ? longScale : shortScale;
        let parts = [];
        let index = 0;

        while (num > 0) {
            let chunk = num % 1000n; //last 3 digits
            if (chunk > 0n) {
                parts.unshift(chunk + " " + suffixes[index]); //add to beginning
            }
            num /= 1000n; //shift right by 3 digits
            index++;
        }

        return parts.join(" ");
    } catch (e) {
        console.error("Error:", e);
        return "Invalid or decimal number";
    }
}

function expandScientificNotation(numStr) {
    return Number(numStr).toLocaleString('fullwide', { useGrouping: false });
}

//Building cost calculator
//Dropdown menu
function dropdown() {
    document.getElementById("dropdownMenu").classList.toggle("show");
}

function advanced() {
    document.getElementById("advanced").classList.toggle("showAdvanced");
}

window.onclick = function(event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//Variables
var startingCost = 15;
var calculatedBuilding = "Cursor";
let buildingCost = 0;
let starterHUowned = false;

$("#starterHUowned").change(function() {
    starterHUowned = this.checked;
    console.log("Starter Kit(chen) owned:", starterHUowned);
});

const startingCosts = {
    "Cursor": 15,
    "Grandma": 100,
    "Farm": 1100,
    "Mine": 12000,
    "Factory": 130000,
    "Bank": 1400000,
    "Temple": 20000000,
    "Wizard Tower": 330000000,
    "Shipment": 5100000000,
    "Alchemy Lab": 75000000000,
    "Portal": 1000000000000,
    "Time Machine": 14000000000000,
    "Antimatter Condenser": 170000000000000,
    "Prism": 2100000000000000,
    "Chancemaker": 2.6e16,
    "Fractal Engine": 3.1e17,
    "Javascript Console": 7.1e19,
    "Idleverse": 1.2e22,
    "Cortex Baker": 1.9e24,
    "You": 5.4e26,
}

//Selecting building functions
function selBuilding(building) {
    startingCost = startingCosts[building];
    document.getElementById("buildingSelectbtn").innerHTML = building;
    calculatedBuilding = building;
}

const buildingNames = {
    "f1": "Cursor",
    "f2": "Grandma",
    "f3": "Farm",
    "f4": "Mine",
    "f5": "Factory",
    "f6": "Bank",
    "f7": "Temple",
    "f8": "Wizard Tower",
    "f9": "Shipment",
    "f10": "Alchemy Lab",
    "f11": "Portal",
    "f12": "Time Machine",
    "f13": "Antimatter Condenser",
    "f14": "Prism",
    "f15": "Chancemaker",
    "f16": "Fractal Engine",
    "f17": "Javascript Console",
    "f18": "Idleverse",
    "f19": "Cortex Baker",
    "f20": "You"
};

function fortuneMatches() {
    buildingCost *= 0.93;
}

function calculateBuildingCost() {
    let amtOwned = $("#amountOwnedInput").val();
    let targetAmt = $("#targetAmountInput").val();
    if (starterHUowned == true) {
        if (calculatedBuilding === "Cursor") {
            amtOwned -= 10;
            targetAmt -= 10;
        } else if (calculatedBuilding === "Grandma") {
            amtOwned -= 5;
            targetAmt -= 5;
        }
    }

    buildingCost = (20 / 3) * startingCost * ((23 / 20) ** targetAmt - (23 / 20) ** amtOwned)
    $(".cheaperBldns:checked").each(function() {
        buildingCost *= $(this).data("multiplier");
    });
    buildingCost *= (1 - (($("#gardenBoost").val()) / 100));
    
    for (let i = 1; i <= 20; i++) {
        let fortuneId = "f" + String(i);

        if (calculatedBuilding === buildingNames[fortuneId] && $("#" + fortuneId).prop("checked")) {
            fortuneMatches();
            console.log(fortuneId)
            break;
        }
    }
    
    buildingCost = Math.ceil(buildingCost);
    $("#numberToWordsLink").attr("href", "./numbertoletters.html?cost=" + buildingCost);
    $("#calculatedCost").text(buildingCost);
    amtToBuy = targetAmt - amtOwned;
    $("#amtToBuy").text(amtToBuy);
    if (amtToBuy != 1) {
        if (calculatedBuilding === "Factory") {
            buildingsName = "factories";
        } else if (calculatedBuilding === "You") {
            buildingsName = "you";
        } else {
            buildingsName = (calculatedBuilding.toLowerCase()) + "s";
        }
    } else { buildingsName = calculatedBuilding.toLowerCase() }
    $("#buildingsName").text(buildingsName);
}

$(document).ready(function() {
    // Load checkboxes
    $("#seasonSavings").prop("checked", localStorage.getItem("seasonSavings") === "true");
    $("#santasDominion").prop("checked", localStorage.getItem("santasDominion") === "true");
    $("#fabergeEgg").prop("checked", localStorage.getItem("fabergeEgg") === "true");
    $("#divineDiscount").prop("checked", localStorage.getItem("divineDiscount") === "true");
    $("#everythingMustGo").prop("checked", localStorage.getItem("everythingMustGo") === "true");
    $("#summonCraftyPixies").prop("checked", localStorage.getItem("summonCraftyPixies") === "true");
    $("#dotjeiessDiamond").prop("checked", localStorage.getItem("dotjeiessDiamond") === "true");
    $("#dotjeiessRuby").prop("checked", localStorage.getItem("dotjeiessRuby") === "true");
    $("#dotjeiessJade").prop("checked", localStorage.getItem("dotjeiessJade") === "true");
    $("#fierceHoarder").prop("checked", localStorage.getItem("fierceHoarder") === "true");
    $("#realityBending").prop("checked", localStorage.getItem("realityBending") === "true");
    $("#bothAuras").prop("checked", localStorage.getItem("bothAuras") === "true");

    $("#gardenBoost").val(localStorage.getItem("gardenBoost") || "0");

    for (let i =1; i <= 20; i++) {
        let fId = "f" + String(i);
        $("#" + fId).prop("checked", localStorage.getItem(fId) === "true");
    }

    //Starter kit(chen) checkbox
    $("#starterHUowned").prop("checked", localStorage.getItem("starterHUowned") === "true");
    
});

$("#advanced input[type='checkbox']").change(function() {
    localStorage.setItem(this.id, this.checked);
});

$("#gardenBoost").change(function() {
    localStorage.setItem("gardenBoost", $(this).val());
});

//Starter kit(chen) checkbox
$("#starterHUowned").change(function() {
    localStorage.setItem(this.id, this.checked);
});

$("#dotjeiessDiamond").change(function() {
    if ($(this).prop("checked")) {
        $("#dotjeiessRuby, #dotjeiessJade").prop("checked", false);
        localStorage.setItem("dotjeiessRuby", false);
        localStorage.setItem("dotjeiessJade", false);
    }
});

$("#dotjeiessRuby").change(function() {
    if ($(this).prop("checked")) {
        $("#dotjeiessDiamond, #dotjeiessJade").prop("checked", false);
        localStorage.setItem("dotjeiessDiamond", false);
        localStorage.setItem("dotjeiessJade", false);
    }
});

$("#dotjeiessJade").change(function() {
    if ($(this).prop("checked")) {
        $("#dotjeiessDiamond, #dotjeiessRuby").prop("checked", false);
        localStorage.setItem("dotjeiessDiamond", false);
        localStorage.setItem("dotjeiessRuby", false);
    }
});

$("#fierceHoarder").change(function() {
    if ($(this).prop("checked")) {
        $("#realityBending, #bothAuras").prop("checked", false);
        localStorage.setItem("realityBending", false);
        localStorage.setItem("bothAuras", false);
    }
});

$("#realityBending").change(function() {
    if ($(this).prop("checked")) {
        $("#fierceHoarder, #bothAuras").prop("checked", false);
        localStorage.setItem("fierceHoarder", false);
        localStorage.setItem("bothAuras", false);
    }
});

$("#bothAuras").change(function() {
    if ($(this).prop("checked")) {
        $("#fierceHoarder, #realityBending").prop("checked", false);
        localStorage.setItem("fierceHoarder", false);
        localStorage.setItem("realityBending", false);
    }
});
