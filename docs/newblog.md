<!-- we will use this comment to store meta info
{
    "title": "Some analysis" ,
    "author": "Matan",
    "tags": ["Analysis", "topology"]
}
-->

I claim that yes! there does exist such a function (which was not actually my first intuition). Here is the construction: 
\begin{itemize}
    \item Let all $f(q) =0$ for all $q\in{}(-\sqrt{2},\sqrt{2})$
    \item Let $f(q)=i\in{}$\ints$^+$ for all $q\in{}(i*\sqrt{2},(i+1)*\sqrt{2})$
    \item Let $f(q)=i\in{}$\ints$^-$ for all $q\in{}((i+1)*\sqrt{2},i*\sqrt{2})$
\end{itemize}

Clearly this function is from \rats{} to \ints{} and is also clearly onto. Let us prove cont. using the sequencial defn. Let \seq{q}$\subseteq $\rats{} be a convergent sequence, converging to $q$. $q$ is in one of the invtervals we set up, since those intervals cover all of $q$. Moreover, it's in only on interval, since the intervals are disjoint. WLOG, assume $q\in{}((i*\sqrt{2},(i+1)*\sqrt{2})$ for some $i\in{}\mathbb{Z}^+$. 

Then, take $\rho=\mathrm{min}\{|q-i*\sqrt{2}|,|(i+1)*\sqrt{2}|\}$. Due to the convergence of \seq{q}, we can find $N$ s.t for $n>N$ $|q_n-q|<\rho$. Then let $\epsilon>0$ be given arbitarly and let $\delta=\rho$. It is satisfied that $0=|f(q_n)-f(q)|<\epsilon$ for all $|q_n-q|<\rho{}$. Thus, $f$ is cont. and the proof is complete.