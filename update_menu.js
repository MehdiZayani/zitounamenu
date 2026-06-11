const fs = require('fs');

const file = 'app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.split("className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}").join("className={`w-[85%] ${isLeft ? '' : 'ml-auto'}`}");
content = content.split("className={`w-full sm:w-[75%] ${isLeft ? '' : 'sm:ml-auto'}`}").join("className={`w-[85%] ${isLeft ? '' : 'ml-auto'}`}");
content = content.split("className={`w-[90%] ${isLeft ? '' : 'ml-auto'}`}").join("className={`w-[85%] ${isLeft ? '' : 'ml-auto'}`}");
content = content.split("w-[90%]").join("w-[85%]");

// Improve fonts
content = content.split('className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"').join('className="text-[18px] sm:text-[20px] md:text-[24px] tracking-wider flex-1"');
content = content.split('className="text-lg sm:text-xl md:text-[22px] ml-2"').join('className="text-[18px] sm:text-[20px] md:text-[24px] ml-2"');
content = content.split('className="text-sm mt-2 px-2"').join('className="text-[13px] sm:text-[14px] mt-1 px-2"');
content = content.split('className="text-xs mt-1 px-2"').join('className="text-[13px] sm:text-[14px] mt-1 px-2"');
content = content.split('className="text-lg sm:text-xl md:text-[24px] tracking-wider"').join('className="text-[18px] sm:text-[20px] md:text-[24px] tracking-wider"');

// Adjust fonts that were already updated
content = content.split('text-[22px] sm:text-[24px] md:text-[28px]').join('text-[18px] sm:text-[20px] md:text-[24px]');
content = content.split('text-[14px] sm:text-base mt-2 px-2').join('text-[13px] sm:text-[14px] mt-1 px-2');

// Also fix the inner single custom styles like TwoColumnMenu
content = content.split('className="text-3xl md:text-[48px]"').join('className="text-2xl sm:text-3xl md:text-[48px]"');
content = content.split('className="text-2xl md:text-[36px]"').join('className="text-xl sm:text-2xl md:text-[36px]"');

fs.writeFileSync(file, content);
console.log("Done");
