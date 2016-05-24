Entry = {};

//
// Triangle
//

Entry.createTriangle = function(left, top, width, height, color, parent)
{
    var div = WebLibSimple.createDivWidHei(left, top - (height/2), width, height, null, parent);

    var canvas = WebLibSimple.createAnyAppend("canvas", div);
    canvas.style.position = "absolute";
    canvas.style.left     = "0px";
    canvas.style.right    = "0px";
    canvas.style.width    = "100%";
    canvas.style.height   = "100%";

    if(canvas.getContext)
    {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = color;
        ctx.beginPath();

        ctx.moveTo(0, 75);
        ctx.lineTo(300, 0);
        ctx.lineTo(300, 150);

        ctx.closePath();
        ctx.fill();
    }
}

Entry.editEntry = function(event)
{
    var target = event.target;

    if (target.control === undefined)
    {
        console.log("++> Entry.editEntry stopped by control");
        return;
    }

    if (target.root)
    {
        target = target.root;
    }

    var json = target.jsonBranch;

    Edit.createEdit(target, json, Entry.parent);
}

Entry.nextEntryStart = 0;

Entry.addEntry = function(event)
{
	var target = event.target;
	var root   = target.root;
	var parent = target.topDiv;

    var tmp = {
        "id": null,
        "uuid": GlobalConf.uuid,
        "Name": "",
        "ShortName": "",
        "Subjects": "",
        "Notes": "",
        "School": ""
    };

    Data.entrys.push(tmp);

    Entry.createEntry(Data.entrys[ Data.entrys.length - 1 ], parent, true);
    target.root.style.top = Entry.nextEntryStart + "px";
}

Entry.createEntryTag = function(tag, title, tagSize, index, parent, virgin)
{
    var paddingLeft = GlobalConf.tagMarginLeft

    var div = WebLibSimple.createDivHeight(paddingLeft, tagSize * index, 0, tagSize, null, parent);
    // WebLibSimple.setBGColor(div, "#4877a8");

    var text = WebLibSimple.createDiv(0, 0, 0, 0, null, div);
    text.style.lineHeight   = div.offsetHeight + "px";
    text.style.fontSize     = GlobalConf.fontSize + "px";
    text.style.overflow     = "hidden";
    text.style.color        = "#ffffff";
    text.style.cursor       = "pointer";

    text.tag                = tag;
    text.title              = title;
    text.virgin             = virgin;
    text.jsonBranch         = Entry.parent.jsonBranch;
    text.onclick            = Entry.editEntry;
    text.control            = "control";

    // text.style.textAlign    = "center";
    // text.style.borderRadius = "30px";

    var span = WebLibSimple.createAnyAppend("span", text);
    span.innerHTML = tag + ": ";
    span.root      = text;

    var span = WebLibSimple.createAnyAppend("span", text);
    span.style.fontWeight = "lighter";
    span.innerHTML        = title;
    span.root             = text;
    text.titleSpan        = span;

    div.text = text;

    return div;
}

Entry.createOptionDiv = function(size, parent)
{
    var margin = 30;
    var optionHeight = size / 2;
    var circleSize = optionHeight - margin * 2;
    var color = GlobalConf.labelColor;

    var topDiv    = WebLibSimple.createDiv(0, 0, 0, optionHeight, null, parent);

    var container = WebLibSimple.createDiv(0, margin, 0, margin, null, topDiv);
    Layout.createLabelCircle("Yes", circleSize, GlobalConf.labelColor, container, null);

    WebLibSimple.setBGColor(container, "#3ed436");

    var bottomDiv = WebLibSimple.createDiv(0, optionHeight, 0, 0, null, parent);
    var container = WebLibSimple.createDiv(0, margin, 0, margin, null, bottomDiv);
    // Layout.createLabelCircle("X", circleSize, GlobalConf.labelColor, container, null);

    var cLabel = Layout.createCircle("X", circleSize, color, container, null);
    cLabel.style.fontSize = circleSize * 0.8 + "px"
    cLabel.style.fontWeight = "100";

    WebLibSimple.setBGColor(container, "#d43636");

    // Layout.createQrCircle(circleSize, GlobalConf.qrColor, GlobalConf.qrColorBG, "QrData", container);
}

Entry.createCircleDiv = function(size, Label, QrData, parent)
{
    var margin = GlobalConf.circleDivMargin;

    //
    // Container div
    //

    var circleDiv = WebLibSimple.createDivWidHei(0, 0, size, (size + margin) * 2, null, parent);
    // WebLibSimple.setBGColor(circleDiv, "#3ed436");

    //
    // Label div
    //

    var Labeldiv = WebLibSimple.createDivWidHei(0, 0, size, size, null, circleDiv);
    Layout.createLabelCircle(Label, size, GlobalConf.labelColor, Labeldiv, null);
    // WebLibSimple.setBGColor(div, "#af36d4");

    //
    // Option div
    //

    var optionDiv = WebLibSimple.createDivWidHei(0, 0, size, size, null, circleDiv);
    optionDiv.style.top = null;
    optionDiv.style.bottom = "0px";

    WebLibSimple.setBGColor(optionDiv, "#af36d4");

    Entry.createOptionDiv(size, optionDiv);

    //
    // qr div
    //

    // var QrDiv = WebLibSimple.createDivWidHei(0, 0, size, size, null, circleDiv);
    // QrDiv.style.top = null;
    // QrDiv.style.bottom = "0px";
    //
    // if (QrData != null)
    // {
    //     Layout.createQrCircle(size, GlobalConf.qrColor, GlobalConf.qrColorBG, QrData, QrDiv);
    // }
    //
    return circleDiv;
}

Entry.createBubble = function(flagPosition, flagWidth, flagSize, color, bubbleRadius, parent)
{
    var bubble = WebLibSimple.createDiv(0, 0, 0, 0, null, parent);

    //
    // Triangle
    //

    var pufferDiv = WebLibSimple.createDivWidth(0, 0, flagWidth, 0, null, bubble);

    Entry.createTriangle(0, flagPosition, "100%", flagSize, color, pufferDiv);

    //
    // content
    //

    var contentDiv = WebLibSimple.createDiv(flagWidth - 1, 0, 0, 0, null, bubble);
    contentDiv.style.borderRadius = bubbleRadius + "px";

    WebLibSimple.setBGColor(contentDiv, color);

    var content = WebLibSimple.createDiv(20, 20, 20, 20, null, contentDiv);

    bubble.content = content;

    return bubble;
}

Entry.createAddButton = function(parent)
{
    var circleSize  = GlobalConf.circleSize;
    var margin      = GlobalConf.margin;

    var marginSize  = circleSize + (margin * 2);
    var addEntry    = WebLibSimple.createDivHeight(0, Entry.nextEntryStart, 0, marginSize, null, parent);

    var center      = WebLibSimple.createAnyAppend("center", addEntry);
    var button      = Layout.createLabelCircle("+", circleSize, GlobalConf.addButtonColor, center, Entry.addEntry);
    button.root   = addEntry;
    button.topDiv = parent;
}

Entry.createEntry = function(data, parent, virgin)
{
    console.log("New Entry: " + JSON.stringify(data));

    Entry.parent = parent;
    Entry.parent.jsonBranch = data;

    //
    // vars
    //

    var circleSize   = GlobalConf.circleSize;

    var margin       = GlobalConf.margin;

    var borderL      = GlobalConf.borderLeft;
    var borderT      = GlobalConf.borderTop;
    var borderR      = GlobalConf.borderRight;
    var borderB      = GlobalConf.borderBottom;

    var bubbleRadius = GlobalConf.bubbleRadius;
    var tagSize      = GlobalConf.tagSize;

    // remove id & uuid --> -2
    var tagCount = Object.keys(data).length - 2;
    var entrySize = tagCount * tagSize + bubbleRadius + borderB;

    var marginDiv = WebLibSimple.createDivHeight
    (
            borderL,
            Entry.nextEntryStart + borderT,
            borderR,
            entrySize,
            null,
            parent
    );

    Entry.nextEntryStart += entrySize;

    var entry = WebLibSimple.createDiv(0, 0, 0, margin, null, marginDiv);

    // WebLibSimple.setBGColor(marginDiv, "#3688d4");
    // WebLibSimple.setBGColor(entry, "#d4cd36");

    //
    // Circle Stuff
    //

    if (virgin)
    {
        var CircleDiv = Entry.createCircleDiv(circleSize, "New", null, entry);
    }
    else
    {
        var CircleDiv = Entry.createCircleDiv(circleSize, data.ShortName, data.id, entry);
    }

    //
    // Bubble
    //

    var Container    = WebLibSimple.createDiv(circleSize, 0, 0, 0, null, entry);
    var flagSize     = GlobalConf.flagSize;
    var flagPosition = circleSize / 2;
    var flagWidth    = GlobalConf.flagWidth;

    var bubble = Entry.createBubble(flagPosition, flagWidth, flagSize, GlobalConf.bubbleColor, bubbleRadius, Container);

    //
    // fill bubble content
    //

    var index = 0;
    var tagSize = GlobalConf.tagSize;

    for (var option in data)
    {
        var tag   = option;
        var title = data[ option ];

        if (tag == "uuid" || tag == "id") continue;

        var entryTag = Entry.createEntryTag(tag, title, tagSize, index, bubble.content, virgin);

        index++;
    }

    if (bubble.offsetHeight < CircleDiv.offsetHeight)
    {
        bubble.style.height = CircleDiv.offsetHeight + "px";
    }
}
