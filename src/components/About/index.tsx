import * as React from "react";
import ReactMarkdown from "react-markdown";
import useAppSelector from "../../global/helpers/useAppSelector";

const md = (version: string) =>
  `# Zaibatsu Bud ${version} - The Combo Toolbag for Tekken

Zaibatsu bud is a combo aggregator for Tekken that works great for practicing combos!

![Akuma doing a sick ass combo](https://raw.githubusercontent.com/alekangelov/zaibatsu-bud_app/main/SCREENSHOT.png)

## Features

- All 51 Tekken characters avalable, including DLC ones.
- Everything is saved in storage.
- Import/Export of combos into propriatery .ZAIC files (it's just JSON).
- Matches the look/feel of Tekken.
- Overlays on top of Tekken in practice mode (only works on borderless windowed mode)
- Combos have name, damage, tags and other metadata.
- Combos can be entered as strings (Standard notation) OR you can use our combo builder and just click what the inputs are!
- Combo importing works via zaibatsu:// protocol, so people can make their own banks of combos (maybe even me, we'll see)!

## License

MIT License

Copyright (c) 2021 Alek Angelov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

function About(): React.ReactElement {
  const version = useAppSelector((state) => state.about.version);
  return (
    <div className="container p-t-10 p-b-10">
      <ReactMarkdown children={md(version)} />
    </div>
  );
}

export default About;
