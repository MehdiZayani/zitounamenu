import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}", "className={`w-[85%] ${isLeft ? '' : 'ml-auto'}`}")
content = content.replace("className={`w-full sm:w-[75%] ${isLeft ? '' : 'sm:ml-auto'}`}", "className={`w-[85%] ${isLeft ? '' : 'ml-auto'}`}")
content = content.replace("className={`w-[90%] ${isLeft ? '' : 'ml-auto'}`}", "className={`w-[85%] ${isLeft ? '' : 'ml-auto'}`}")
content = content.replace("w-[90%]", "w-[85%]")

# Improve fonts
content = content.replace('className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"', 'className="text-[18px] sm:text-[20px] md:text-[24px] tracking-wider flex-1 uppercase"')
content = content.replace('className="text-lg sm:text-xl md:text-[22px] ml-2"', 'className="text-[18px] sm:text-[20px] md:text-[24px] ml-2"')
content = content.replace('className="text-sm mt-2 px-2"', 'className="text-[13px] sm:text-[14px] mt-1 px-2"')
content = content.replace('className="text-xs mt-1 px-2"', 'className="text-[13px] sm:text-[14px] mt-1 px-2"')
content = content.replace('className="text-lg sm:text-xl md:text-[24px] tracking-wider"', 'className="text-[18px] sm:text-[20px] md:text-[24px] tracking-wider uppercase"')

# Adjust fonts that were already updated
content = content.replace('text-[22px] sm:text-[24px] md:text-[28px]', 'text-[18px] sm:text-[20px] md:text-[24px]')
content = content.replace('text-[14px] sm:text-base mt-2 px-2', 'text-[13px] sm:text-[14px] mt-1 px-2')

# Also fix the inner single custom styles like TwoColumnMenu
content = content.replace('className="text-3xl md:text-[48px]"', 'className="text-2xl sm:text-3xl md:text-[48px]"')
content = content.replace('className="text-2xl md:text-[36px]"', 'className="text-xl sm:text-2xl md:text-[36px]"')

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
