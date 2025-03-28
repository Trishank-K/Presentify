'use client'
import usePromptStore from '@/store/usePromptStore'
import React from 'react'
import {motion} from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/constants'
import { Card } from '@/components/ui/card'
import { timeAgo } from '@/lib/utils'

type Props = {}

const RecentPrompts = (props: Props) => {
    const {prompts, setPage} = usePromptStore();
    return (
    <motion.div variants={containerVariants} className='space-y-4 !mt-20'>
        <motion.h2 variants={itemVariants} className='text-2xl font-semibold text-center'>
            Your Recent Prompts
        </motion.h2>
        <motion.div variants={containerVariants} className='space-y-2 w-full mx-auto'>
            {/* {prompts.map((prompt,index)=>{ */}
                 <motion.div /*key = {index}*/ variants={itemVariants}>
                    <Card className='p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300'>
                    <motion.div initial={{x:400}} animate={{x:0}} transition={{duration:0.3}}>
                        <h3 className='font-semibold text-xl line-clamp-1'>
                            {/* {prompt?.title} */}
                            This is the title
                        </h3>
                        <p className='font-semibold text-sm text-muted-foreground'>
                            {/* {timeAgo(prompt?.createdAt)} */}
                            2 days ago
                        </p>
                    </motion.div>
                        </Card> 
                </motion.div>
            {/* })} */}
        </motion.div>
    </motion.div>
  )
}

export default RecentPrompts