#!/bin/bash

SESH="presentify"

tmux has-session -t $SESH 2>/dev/null

if [ $? != 0 ]; then
    tmux new-session -d -s $SESH -n "app"

    tmux send-keys -t $SESH:app " cd /home/trishank/Desktop/presentify" C-m
    tmux send-keys -t $SESH:app "clear" C-m
    tmux send-keys -t $SESH:app "bun run dev" C-m
    
    tmux new-window -t $SESH -n "prisma"
    tmux send-keys -t $SESH:prisma "cd /home/trishank/Desktop/presentify" C-m
    tmux send-keys -t $SESH:prisma "clear" C-m
    tmux send-keys -t $SESH:prisma "bunx prisma studio --browser none" C-m

    tmux select-window -t $SESH:app
fi

tmux attach-session -t $SESH