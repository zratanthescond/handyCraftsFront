import { useState } from "react";

import { Helmet } from "react-helmet-async";
import './wheelOfFortune.css'

import { Wheel } from 'paramall-wheel-of-fortune'
import {Link} from "react-router-dom";
import clsx from "clsx";

const roulettePointerImageUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAAJbCAYAAABzbERuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAsbklEQVR4nO3d2Y8d553e8aeqm9Qu0VpsyZZsy7ZCa2xnFgMxEsdEAvTdXOQ/yE3+l1zMzUwGSDIIIGEEDwxY44tgbEjBQEAQauSMbXiLTNMtWpRoUlxb4r70OafeNxdVp3n6dJ21lnf7fgDDEtVsviRP93PeX9X7VCYgQPb4Sw9J+eOSnlKmhyQdkc2fUKYHJX1K0oakI+VH55+qftpjUr6pTA/J6rCkw8ryhySzIeUPVx/7kGQ2q4/P7v+4JOmQlB/e+7csf0DW5AcWl2082N7vdIIt7h38tXIja3bv/4AZSBpO/PsdSbb853wkmbv3fzwvZM1dSQNlGsjqrmRGkm5WH3O1+iTXJBWSrsrqnjJzXdK18uP1sWRuZMdO3W3t9wn0JHO9AMSvCqunlOlJSc/I5keU6YikJyQ9LuVPSPkRZXpUVo8q08NS/oikR6vAOSTljyjTpqwOKdt4QLx2fWNli11lGspqJJnbkoZVIN+SzG1Z3VGmW7K6JZlrkrku6Yak67K6psxck3RFVp9I5mNCFV3jmwgWssdf2pDy55Xp05I+LeVPS3pKyp9Suds6UgZY/rjKXdajkh5Rlj9c7qiyzTmfHpjBljtWa+5Iui2ZW5JuypobZYDqmqSrkvlY5U50R9JlWV2WzLns2KnC3doRAgIwMfb4y49I5gVl+bOSnlcZaM9IelrKn1SWP1XuyPSElD+qLH9Eyh6e/1kBH9k7smYcnNclc13WfCyZTyTtSOaKpMuSzsmai1J+Njt28rbbNaNPBGDg7Dv/Kldx/QVlekHKPy/ln5X0aUmfLXdq+ZPK8ifL62X548qyB1yvGfCWtbuSuSGZG7LmkzIszY6k85IuS+a8ZP4gq7PaeOJs9u2fGtdLxvoIQE/Z40cfV6Yvy+ZfUKYvSflzyvLnq93ap8travlj0saj4u8RcMFKxS1Zc7Maw16WzBVZc04yF2R1Wpk5I6v3s2PbN1wvFgfxjbNn9vhLh6X8K1L+L6pg+4Ky/Dkpf666pvaklD/R2Z2EAPpni3vVTT+flGFpLsiaC5I5I6vTknlPMr/Pjp0auF5qSgjAFtnjLz+izLwkm7+kLH9R0otVsD2nLH9GWf40OzYAM4x3lDuy5opkLpT/0wey5gNl5pRsforrlO3hG/EK7PGjn1GmP5Lyo1L+ZWX5F6X8c1L+bBVuj7leI4DYFTdlzY5kLkrmI1nzoWTel8y2rH6bHdu+5HqFoSAAJ9jjR59Xpm9I+ctS/mUp/7yy/LNS/mx5MwljSQCeK8etn0jmomx1004ZkCdl9W52bPuc6yX6IqkAtMdfekhZ/nUp/7qUf7UKuRfKkNt8hjskAUTP2l1pdKUKx7NVOP5OMr+RNb9JqYAgugC0x196Rln+TSn/hpQfVbb5RUnPS5ufUbbxhCL8PQNAS6xscV0aXZJ0Tnb0oWS2JfOurPl5duzUFdcLbFOQYWCPH31amf60CrmXlW1+qdrJPct1OADoSnGzLA0wZ2VHpyVzsgxH/TI7tr3jenWr8jYA7dsvPyiZP5XyP5PyryvLv1Jek9t8Vtp43PX6AACTihuyo4tlUYD5vWR+I5lfSPkvs++cPFjk7gHnAWiPH31Oyr+lTH+sbPOPpPxL0ubny7sqs4NN+wCAgFhT3rU6+oNkTsuOfiurX0vmJ9mx7QsuV9ZbANq3j35Nyr8l5X9cXpvLX1S2+Tlp45G+1gAA8ElxW3b0kaz5oCoD+JVkfpJ9Z/tEH7966wE4EXR/MrGj+yx3WAIAllLeqXp+b8fYUTCuHYD2+NGvKsv/DUEHAOhFXTBa8+Ps2Pbv1vl0CwPQHj/6pLL829Wu7l8qy4+W1+g4FA4A8IAt7kmjP8iabcn8P8n8RNa8kx3b/mTeT9sLQHv8pQ1l+Z9I+belzT9Tln9Nyr+o7NBT8uBmGQAAVmBlhx9L5kNZc0Ia/UIy78iaX40flpzZt7/xD8o2vy5tPq8sO+R6xQAAdMbaoTQ6J2tObCrLP6fs0Iuu1wQAQOey7JB06EWpuJrLDl5zvR4AAPpl/i6zb7/8oPKHdziPBwBIQ35Lm48/n2ffOXlP5t6brpcDAEAvMh3PvvWP18uqMXv3Lx0vBwCAfmQP/60k5ZKUHTv9Y9nd950uCACArmWbZ3T42TekKgAlSebOd50tCACAXuRvZt/83m1pMgCLK38tWwydrQkAgG4NtHHkv4//ZS8As39/7arsrf/tZk0AAHQsO/xLbT7+7vhf9z9vb3TpryTb95IAAOhB9t3sm9/bC7n9AVhc+18yty72viYAALqUbe7ogRe+N/lD+wIw25JV8Qk3wwAA4mLNP2bf/N7VyR/KD3zQ6NJfyewyBwUAxMIof+C/TP/ggQDMtnRexSfv9LMmAAA69272r//PT6d/8OAOUJKKs38ty4kIAEAE7O7f1v1wfQBa/U+Ndq51uBwAAHpQ3FR2+G/q/kttAGZbGsqc/TuORAAAgmbu/Sj79s/u1f2n+h2gJBn9jYqPO1sTAACdsoVUXP2LWf95ZgBmWzqh0elfdLMqAAA6Zm79Nvt353816z/P3gFK5S7Q3Gx7SQAAdMxKow/+67yPmB+A0vc1fP9uiysCAKB7xbV7MoPX5n3I3ADMtnRDZvD3MmQgACAUVhqd+kG2pdvzPmrRDlCSXtHobEuLAgCgY8U1yei/LfqwZQLwbRXXfi+723xRAAB0bXTqVLal/7vowxYGYLYlK+lVDS+1si4AADpjrktG/2OZD11mByhJr6m4aKSiwaoAAOiSlQbbI0lLPdVoqQDMtnRe0psaXmiyMgAAulN8LFn9KNvSUiPLZXeAkvSqivPlyXoAALxipeFpSXp12Z+xSgD+UFZXNLq88rIAAOhUcVmyuijpzWV/ytIBmG1pKOm7Ks6yCwQA+MMW0vCMJL2WbWm07E9bZQcoSa/KShpRkg0A8ITZGT+8aOnxp7RiAGZbOiHpJyo+FI9KAgA4ZwtpcEaS3sm29N4qP3XVHaAkvSIr8agkAIBzo3Pjf1pp9yetF4Dfl3SnvNuGXSAAwBE7lIpLknRL0uur/vSVAzDb0g1JP2AXCABwavjBeB/2eralW6v+9HV2gJL0SvmLswsEADhgbpel16WVx5/S+gH4tqTfswsEADgxPDH+p+1sS++s8ynWCsC9gmyJXSAAoF/Fdcns/dsr636adXeAkvSaJFPuAmmHAQD0wUrD7fG/LF18XWftANwryJaqE/jsAgEAHRtemYybN7ItXVz3UzXZAUrjMSi7QABA1+xQZRHLnrXHn1LzAPyhpCuSyl0gHaEAgK4Mz07u/i5JeqPJp2sUgHsF2VK5KJ4UAQDogrktFTuTP7JS8XWdpjtAafL8xYgnRQAAOnD/2MPYWmf/JjUOwL2C7LERT40HALSo2Jk89iCVxdfbMz56aW3sAKXJC5Gj8+WFSgAAmrLF+Envkxrv/qT2ArAsyB4bsgsEALRg+NH0Kbu1iq/rtBKAewXZY+aiZHfb+NQAgFSZXak4cMxvreLrOm3tAKXJMajV+PH0AACsZ/jruh9tZfwptRuAZUH2WHFNMndb/PQAgGQcvPFFalB8Xae1ANxXkD02bHyTDgAgNXZYd+OL1LD5ZVqbO0BpXJA9ZgaSudnyLwEAiNr9B91OalR8XafVANxXkD02PCmKsgEASzE3Jx90O6lR8XWdtneA0vQY1GjWbwYAgAlWGpyc9R9bHX9K3QTg/YLsseEpsQsEAMx18MzfWOPi6zqtB+C+guwxK2nY6s4VABATu1s2idVrXHxdp4sdoFR3ToOibABALSsNas/8jbV29m9SJwF4oCB7jMPxAIBpwyt1Z/7GWim+rtPVDlCqu2BZ7HA4HgBwn92VRh/O+4hOdn9StwG4vyB7jMPxAICx+aPP1oqv63QWgAcKssfMQCqud/XLAgBCUV93Nqm14us6Xe4ApVnnNobb4lgEACRsdt3ZpM7Gn1L3Abi/IHuMYxEAkLbBqUX7oFaLr+t0GoC1BdljxVmeHA8AKSquS2bhZLP15pdpXe8ApemC7DEraXi2h18eAOANO1zmZsjWi6/rdB6AtQXZY8WOZG53vQQAgC8GJ5a5BaT14us6fewApXkXMgcnxA0xAJCA4mp5EmCxzsefUn8BeLAge8xKKj7uaRkAACfsbnnjy2KdFF/X6SUAawuyJw1O0xMKADGbf+B9UifF13X62gFKi85z0BMKAHEaXl504H1Sp2f/JvUWgDMLsse4IQYA4rO463NSZ8XXdfrcAUqLLmxyQwwARGThY46m9bb7k/oPwPqC7DFuiAGAeAwvrjL67LT4uk6vATizIHvS8DQNMQAQOnO7fBD68jotvq7T9w5QWjQGtZKGH/SzEgBA+2xRXdJaSa/jT8lNANYXZE8qrknmZi+LAQC0bPj+qrdzdF58Xaf3AJxbkD1pcFLcEAMAgSmulpuY1fTS/DLNxQ5QmlWQPclKGn7Uy2IAAC2ww2XbXib1Unxdx0kAzi3InjQ6L5nd7hcEAGjISoNfrvMTeym+ruNqBygte8FzuNIZEgCAC6sdeZjkZPwpuQ3A2QXZk4zKlhgAgJ9WP/Iw1lvxdR1nAbiwIHsSZwMBwE/rHXkY6634uo7LHaC07BjUqskfMACgK8OTTW7Y7/3s3ySnAbiwIHuSGZS31wIA/FBckorZ7ZYL9Fp8Xcf1DlBa5QLo8BSjUADwgbkrDRo9xs7p7k/yIwDnF2RPslrnjAkAoE22kAbvNvkMvRdf13EegEsVZE8yt6TiencLAgDMt3rV2bTei6/rOA/AymrnQIbb5TsQAEC/ip11qs6mOR9/Sv4E4OKC7ElW5TsQAEB/zN3yWFozToqv63gRgEsXZE8qrjEKBYC+jK/7NX9GgbPml2leBGBlcUH2NEahANCPZuf9xpwVX9fxJgCXLsieZFX+pQAAujO83OS83yRnxdd1vAnAyuoXRos7HJAHgK6Y29Low7Y+mzfjT8m/AFyuIHvagAPyANA6O2yzhtJp8XUdrwJwpYLsaXSFAkCLquf7Nb/uN+a0+LqOVwFYWe98iBmUc2oAQHODs+s+328WL87+TfIuAFcqyJ42+lCyPEEeABoprktFq/eqOC++ruNdAFbWv1C6+2u1uWcHgKSYu9Kg9azybvcn+RuAyxdkT7OShh+1uhgASELzkus6XhRf1/EyAFcuyJ42Ol/eugsAWF47h92neVF8XcfLAKw0Oy8yOEFLDAAsa3iurcPu07wcf0p+B+BqBdnTrLqYYwNAfIrr5eSsfd4UX9fxNgDXKsieZm6Vj+4AANQzd8te5W541fwyzdsArKxekD1tcLr8CwYA7GeHbT3hoY5Xxdd1vA7AtQqy6wzeFUcjAGBS600v07wqvq7jdQBWml9AtSpbDQAApcEHbTe9TPN6/CmFEYDrFWRPKy7yAF0AkKrHG3V6f4R3xdd1vA/ARgXZ04bbVKUBSJu52ebjjWbxrvi6jvcBWGnnHImVNKAqDUCi7K406OUh4t6e/ZsURAA2KsieZlTOvgEgJbYou5K7f//vZfF1nSACsNLeBdVih6fIA0iIlQY/72v4FcTuTworANcvyK4zOMX5QABpGJzq+o7PMW+Lr+sEE4CNC7LrDN6lLxRA3IbnpOJaX7+at8XXdYIJwEq750qsyvZzAIhRcbWrjs9Zghl/SuEFYLOC7DrFnfJMDADExNwuR5/98br4uk5QAdhKQXad0Yc8PxBAPOxu+Ui4fnnf/DItqACsNC/IrjM4URbDAkDI+jvuMMn74us6wQVgawXZ06zKYlgOyQMIVq/HHSZ5X3xdJ7gArHRzodWI0mwAgbLS7sm+jjtMC278KYUbgO0UZNcpLvIQXQDhGZwtHwLevyCKr+sEGYCtFmTXGZzmphgA4RheKN+8uxFE8XWdIAOw0u15E26KARCC4qo0cnrpJqizf5OCDcBWC7LrWEm7v6QpBoC/zM2+z/pNC6b4uk6wAVjp9sIrTTEAfGVu9/Voo3mC3f1J4QdguwXZdYo75XwdAHwxPuju9tRWUMXXdYIOwE4KsuuMzvL4JAB+sEMXB93rBFV8XSfoAKz0c/5kcIo7QwG4ZYfVvQmuFyIp8PGnFEcAtl+QPcvgRDl6AIC+2cKn8Auu+LpO8AHYWUF2Hatq9MCdoQD65KzibJYgm1+mBR+AlW4KsutYlS9Ej16JAGJmyzfebirO6gRZfF0nigDsrCB7FiPXZ28AJMGWl17MwPVCJgVZfF0nigCs9HtBtrgmDc/1+ksCSMzgVHkUyy9RjD+luAKwu4LsWUbnKc4G0I3hmfKNtl+CLb6uE00Adl6QPcvgtFRc7/2XBRCx4RlpdMn1KuoEW3xdJ5oArLg5lzLY5owggHYMz/kaflIEZ/8mRRWAnRdkzzM4IZm7Tn5pAJEYXigvrfgp6OLrOlEFYMXNBVorafAuj1ACsJ7hBdePNVokqt2fFGcAdl+QPcveI5QIQQArGF72PfyCL76uE10A9laQPQvPEQSwiuFlafSh61UsEnzxdZ3oArDi9pzKuC2GEAQwTxjhJ0U4/pTiDcD+CrJnMSqvCVKZBqDO8EIo4RdF8XWdKAOw14LsecygvDuUEAQwyf8bXiZF0/wyLcoArPRXkD1PcYcQBHBfWOEXTfF1nWgDsPeC7HmKO9LgA9erAODa8FxI4SdFVHxdJ9oArLgfg44VO2VtGoA0Dc/4fMh9lmjHn1L8Adh/QfY8hCCQpsEffK43myWq4us6UQegs4LseQhBICFWGrwnFUFOEaMqvq4TdQBW/BmDjhGCQAKstHvSx0caLcu/750tiz4AnRZkz0MIAvGyhbT7a8kEW54SXfF1negDsOLnhdy9EOSIBBANW5RNUGbgeiVNRL/7k9IJQHcF2YsUO5wTBGJhh9Luz304gdxElMXXdZIIQOcF2YtwWB4In92tivBdL6SxKIuv6yQRgBU/x6BjxZ3ymkEEXz1Acszd8us3ji/fJMafUloB6L4gexEzkHZ/xlMkgJCYm9XDsF0vpBXRFl/XSSYAvSnIXsSovIbAQ3UB/xXXy6MOcYSf5PukrGXJBGDFj4LsRXiyPOC/4QVpENVJgaiLr+skFYBeFWQvMg5Bc9f1SgDsY6tqs6BKrZcRdfF1naQCsOL/GHTMqry2YG66XgkAqTrgfjLUarNFkhp/SmkGoF8F2YtYVV9wV12vBEibHVYH3KM8IRB98XWd5ALQy4LsZQxOScPLrlcBpMncrS5JuF5IZ6Ivvq6TXABWwhmDThp9WF57iOiWM8B7cR1zmCXM74kNZa4X4Ip9S/8s6Vuu17GW/LB0+BtStuF6JUDcikvS4IzrVXTtnWxL/9b1IlxIdQcohXzB1ww4Kwh0qrrTM/7wkxLd/UlpB6C/BdnL2DsryDEJoF1F2cgU552e05Ipvq6TbAB6X5C9DCtp992yjQJAc3ZXuhf80xxWkUzxdZ1kA7AS7hh0zKpsoxiec70SIGzF9ZgKrZeV7PhTSvgmGEmybymT9J6kr7heSys2HpYOvczNMcCqhuek0XnXq+jbdralr7pehEtJ7wCDKcheVnGnujlm1/VKgDDYQtr9VYrhJ8UwAWso6QCshFGQvSyrcozDdUFgPrNbPb194HolLiRXfF0n+QAMqiB7WXvXBc8otQsawFKKqyle75uUXPF1neQDsBLPGHTS6FL1gF3OCwIlKw1Ol9WCaUt+/CkRgGNhFWSvwqjqMOSJEkic3ZXu/UwqdlyvxLUki6/rEIAKuCB7WeMnSgzPKeWZDxJmrkv3kh55Tkqy+LoOAXhfnGPQSaPz1XUPRqJIRTXy3I3qye1Nxf+9bklJnwOcFnRB9ioySYeOShtPuF4J0B27m/qNLnWSLb6uww5wvzQuDI/vEh2cLs9BAbEpdhh51mP3N4Ed4AT7lh6XdEHSw67X0ptM0uGvSfkjrlcCNGeL8s1dnE9tb+qWpOdS7v6cxg5wQhQF2auyknZPSMML4u0ygmZuVgfb+f4+Q9LF13UIwIPSGINOG50tbxE3PF4Joame3bd7kvdw8zH+nMIIdEp0Bdnr2HxBOvSseHnAe+a2NDhB8C2WfPF1HXaAU6IryF4Hu0F4z5bnWncJvyWlOdlagLf4Nexb+qyks+INgrT5GWnzeR6xBH+w61vVSNILdH8exDf4GlEWZK9rdKm6sYAqNThmi+paH+G3IoqvZyAAZ0t7DDppXKU2eI8WGbgxvsOz4Pv4Ghh/zsAIdAb7lg5J+kjSM67X4h1ukkFfbCEN35eKa65XEqpLkp6n+7MeO8AZoi/IbmLvJhnGouhQsSPd+znh1wzF13MQgPMxBp1lPBbd/W3ZuQi0xdyVdn9aVvWhKb6HzcEMa4FkCrKb2nhWOvQ57hbF+mwhDT/iOl97KL5egB3gYlxAXkZxsRxXDS+LW/SwGisVl7jJpX3s/hZgB7hAkgXZTWWSDn1J2nhKvMQwl7kpDagw6wDF10tgB7hAkgXZTVmV12/u/UwqrrteDXxk7kq7v6K/szsUXy+BAFwOY9B1jJ87eO+nBCFKdlieJ919VzID16uJGePPJTCfWgIF2S3JJB16Sdo4Il56ibGFNLogjc67XkkKKL5eEjvAJVCQ3RIraXCqGo1eFbOvBNiiLK2+93PCrz9MrJbE2/AlUZDdgUzSxgvS5qc5PhEbW0ijy2VpAvpE8fUKCMAV2Lf0I0l/7nod0ckk5c9Kh56TskOuV4Mm7LAsUGe358o/ZFv6D64XEYpN1wsIzKsiANtnVZ7/Ki5K+aPSoRek/DHXq8Iq7K40ulie52Oy7RLjzxWwA1wBBdk9yiQd+oKUP8141GfmtjT6iL5OP1B8vSKuZ62AguweWUmDM2U7yOA3VfE2Wws/2PImpt2fls/mI/x8QfH1itgBrsi+pa9J+o3rdSQpk7TxGWnzWSl7wPVq0jO+vlec572In76abWnb9SJCQgCugYJsD+SS8hekzScJw05ZqbghjT7g4LrfKL5eAzfBrOcVEYBuGUnmbHmbPWHYPntXGl6RzEV2e2HgnPIa2AGugYJsj43HpBtPS/nD4iW+ArsrjT6RirOEXlgovl4T3x3WZN/Sa5L+o+t1YI5MUn5E2nimPF7BGcODzF2p+JjremF7NdvSf3K9iBAxAl3fKyIA/WZV3qE4vksxU3msYuNT6QaiLSRzqww9s0PoxYHx55rYAa6JguwIjHeI2RFp4zEpf1DxfUlYydwpb2QxZ8trp4gJxdcNsANcU7Yla9/Sq5L+s+u1YE3jHaKuae/01L5QfETKHgzrIL4dloFnbkrmPIEXP5pfGojt7W6vKMhORDb+3xEpe6y8uSY7LOWHJTkKR1tI9p5kB2Ubi9kp/5mRZkoovm6IAGyIguzEjb+CssNS9rCkB8tri/khSRtStilpU8rG75Hy8n/Tu0pbVP9gyv/Z0f3/N/fKnZ29JelWGXIEHSi+bowRaHMUZKdsHER2IImD4ugV48+GGN0190NJV1wvAkBSLkl6w/UiQkcANkRBNgAHKL5uAQHYDs7hAOgT33NaQAC2INvSCUk/cb0OAEl4h6c+tIMAbA8XpAH0gd1fSwjA9nxf0h3XiwAQtVuSXne9iFgQgC3JtnRD0g9crwNA1F7nqQ/tIQDbxRgUQJcYf7aIAGzX25J+73oRAKK0nW3pHdeLiAkB2KJsS1a8QwPQDSZMLSMA2/ea6OAH0K6RKNxoHQHYsmxL5yW96XodAKLyBk99aB8B2A3GoADaxPizAwRgNyjIBtAWiq87QgB2gIJsAC2i+LojBGB3GIMCaAPfSzpCAHaEgmwALaD4ukMEYLe4cA2gCXZ/HSIAu0VBNoB1UXzdMQKwQxRkA2iA4uuOEYDdYwwKYB2MPztGAHbvbUmnXC8CQFAovu4BAdgxCrIBrIHJUQ8IwH68JqlwvQgAQaD4uicEYA+yLV0QBdkAlkPxdU8IwP4wBgWwDMafPSEA+/MjSZddLwKA1yi+7hEB2BMKsgEsgeLrHhGA/WK0AWAeLpX0iADsUbalk5L+2fU6AHiJ4uueEYD9YxcIoA67v54RgP2jIBvANIqvHSAAe5Zt6aZ4oQPYj+JrBwhANxh1AJjE9wQHCEA3/kkUZAMoUXztCAHoAAXZACZwY5wjBKA7FGQDoPjaIQLQEQqyAYjia6cIQLcYgwJpY/zpEAHoFgXZQLoovnaMAHSIgmwgaRRfO0YAuscIBEgTl0AcIwAdoyAbSBLF1x4gAP3ALhBIC7s/DxCAfqAgG0gHxdeeIAA9QEE2kBSKrz1BAPqDkQiQBr7WPUEA+oOCbCB+FF97hAD0BAXZQBK44c0jBKBfKMgG4kXxtWcIQI9QkA1EjeJrzxCA/mEMCsSJ8adnCED/UJANxIfiaw8RgJ6hIBuIEsXXHiIA/cSoBIgLlzY8RAB6iIJsICoUX3uKAPQXu0AgDuz+PEUA+ouCbCB8FF97jAD0FAXZQBQovvYYAeg3RidA2Pga9hgB6DcKsoFwUXztOQLQYxRkA0HjRjbPEYD+oyAbCA/F1wEgAD1HQTYQJIqvA0AAhoExKBAWxp8BIADDQEE2EA6KrwNBAAaAgmwgKBRfB4IADAcjFSAMXLIIBAEYCAqygSBQfB0QAjAs7AIBv7H7CwgBGBYKsgF/UXwdGAIwIBRkA16j+DowBGB4GLEAfuJrMzAEYHgoyAb8Q/F1gAjAwFCQDXiJG9QCRACGiYJswB8UXweKAAwQBdmAVyi+DhQBGC7GoIAfGH8GigAMFwXZgHsUXweMAAwUBdmAFyi+DhgBGDZGL4BbXIoIGAEYMAqyAacovg4cARg+doGAG+z+AkcAho+CbKB/FF9HgAAMHAXZgBMUX0eAAIwDoxigX3zNRYAAjAMF2UB/KL6OBAEYAQqygV5x41kkCMB4UJANdI/i64gQgJGgIBvoBcXXESEA48IYFOgW48+IEIBxoSAb6A7F15EhACNCQTbQKYqvI0MAxocRDdANLjFEhgCMDAXZQCcovo4QARgndoFAu9j9RYgAjBMF2UB7bkv6e9eLQPsIwAhRkA206vXqawqRIQDjxcgGaAdfS5EiAONFQTbQ3HvZlv7J9SLQDQIwUhRkA63gayhiBGDcKMgG1leo/BpCpAjAiFGQDTRC8XXkCMD4McIB1sN52sgRgPGjIBtYHcXXCSAAI0dBNrCW71ZfO4gYAZgGRjnAaviaSQABmAAKsoGV/Djb0u9cLwLdIwDTwTtaYDncOJYIAjAdFGQDi90WPbrJIAATQUE2sBSKrxNCAKaF0Q4wH18jCSEA00JBNjAbxdeJIQATQkE2MBdfG4khANNDQTZwEMXXCSIAE0NBNlCL4usEEYBpYtQD7Mc52QQRgGmiIBu4j+LrRBGACaIgG9iH4utEEYDpYuQDlPhaSBQBmCgKsgFJFF8njQBMG+98kTpuCEsYAZg2CrKRMoqvE0cAJoyCbCSO4uvEEYBgBIRU8dpPHAEICrKRIoqvQQCmjoJsJIrXPAhASKIgG2mh+BqSCECIgmwkh+JrSCIAcR8jIaSC86+QRADiPgqykQKKr7GHAIQkCrKRDIqvsYcAxCRGQ4gdr3HsIQCxh4JsRI7ia+xDAGIa75ARK270wj4EIKZRkI0YUXyNAwhA7ENBNiJF8TUOIABRh1ERYsNrGgcQgKhDQTZiQvE1ahGAOICCbESG1zJqEYCYhYJsxIDia8xEAKIWBdmIBMXXmIkAxDyMjhA6zrViJgIQ81CQjZBRfI25CEDMREE2AkfxNeYiALEIIySEitcu5iIAMRcF2QgUxddYiADEMngnjdBwAxcWIgCxDAqyERKKr7EUAhALUZCNwFB8jaUQgFgWIyWEgtcqlkIAYlkUZCMEFF9jaQQglkJBNgLBaxRLIwCxCgqy4TOKr7ESAhBLoyAbnqP4GishALEqRkzwFedVsRICEKuiIBs+ovgaKyMAsRIKsuEpiq+xMgIQ62DUBN/wmsTKCECsjIJseIbia6yFAMS6eMcNX3BjFtZCAGJdFGTDBxRfY20EINZCQTY8QfE11kYAoglGT3CN1yDWRgCiCQqy4RLF12iEAMTaKMiGY7z20AgBiKYoyIYLFF+jMQIQjVCQDUcovkZjBCDawCgKfeMcKhojANEGCrLRJ4qv0QoCEI1RkI2eUXyNVhCAaAsjKfSF1xpaQQCiFRRkoycUX6M1BCDaxDtzdI0brtAaAhBtoiAbXaL4Gq0iANEaCrLRMYqv0SoCEG1jRIWu8NpCqwhAtI2CbHSB4mu0jgBEqyjIRkd4TaF1BCC6QEE22kTxNTpBAKJ1FGSjZRRfoxMEILrCyApt4XwpOkEAoisUZKMNFF+jMwQgOkFBNlpC8TU6QwCiS4yu0BSvIXSGAERnKMhGQxRfo1MEILrGO3isixup0CkCEF2jIBvroPganSMA0SkKsrEmiq/ROQIQfWCUhVXxmkHnCED0gYJsrILia/SCAETnKMjGinitoBcEIPpCQTaWQfE1ekMAohcUZGNJFF+jNwQg+sRoC4twbhS9IQDRJwqyMQ/F1+gVAYjeUJCNBSi+Rq8IQPSNERdm4bWBXhGA6BUF2ZiB4mv0jgCEC7zTxzRukELvCEC4QEE2JlF8DScIQPSOgmxMofgaThCAcIWRF8Z4LcAJAhCuUJANieJrOEQAwgkKslHhNQBnCEC4REF22ii+hlMEIJyhIDt5FF/DKQIQrjECSxfnQeEUAQjXKMhOE8XXcI4AhFMUZCeL4ms4RwDCB4zC0sPfOZwjAOEcBdnJofgaXiAA4Qt2BOngxid4gQCELyjITgPF1/AGAQgvUJCdDIqv4Q0CED5hNBY//o7hDQIQPqEgO24UX8MrBCC8QUF29Pi7hVcIQPiGguw4UXwN7xCA8AoF2dGi+BreIQDhI0Zl8eGcJ7xDAMJHFGTHheJreIkAhHcoyI4OxdfwEgEIXzEyiwd/l/ASAQgvUZAdDYqv4S0CED5j5xA+bmiCtwhA+IyC7LBRfA2vEYDwFgXZwaP4Gl4jAOE7Rmjh4u8OXiMA4TsKssNE8TW8RwDCaxRkB4u/M3iPAEQIKMgOC8XXCAIBCO9RkB0ciq8RBAIQoWCkFg7ObyIIBCBCQUF2GCi+RjAIQASBguxgUHyNYBCACAmjNf/xd4RgEIAIBgXZ3qP4GkEhABEadhj+4kYlBIUARGgoyPYTxdcIDgGIoFCQ7S2KrxEcAhAhYtTmH/5OEBwCECGiINsvFF8jSAQggkNBtnf4u0CQCECEioJsP1B8jWARgAgSBdneoPgawSIAETJGb+5xLhPBIgARMgqy3aL4GkEjABEsCrKdo/gaQSMAETpGcO7wZ4+gEYAIGgXZzlB8jeARgIgBO5H+cQMSgkcAIgYUZPeL4mtEgQBE8CjI7h3F14gCAYhYMJLrD3/WiAIBiFhQkN0Piq8RDQIQUaAguzf8GSMaBCBiQkF2tyi+RlQIQESDguzOUXyNqBCAiA0juu5w3hJRIQARGwqyu0HxNaJDACIqFGR3huJrRIcARIwY1bWPP1NEhwBEdCjIbh3F14gSAYhYsWNpDzcWIUoEIGJFQXY7KL5GtAhARImC7NZQfI1oEYCIGaO75vgzRLQIQMSMguxmKL5G1AhARIuC7Mb4s0PUCEDEjoLs9VB8jegRgIgaBdlro/ga0SMAkQJGeavjHCWiRwAiBRRkr4biaySBAET0KMheGcXXSAIBiFQw0lsef1ZIAgGIJFCQvTSKr5EMAhApYWezGDcMIRkEIFJCQfZ8FF8jKQQgkkFB9kIUXyMpBCBSw4hvNv5skBQCEKmhILsexddIDgGIpFCQPRN/JkgOAYgUUZC9H8XXSBIBiORQkH0AxddIEgGIVDHyu4/zkUgSAYhUUZBdovgaySIAkSQKsvdQfI1kEYBIGaM//gyQMAIQyaIgm+JrpI0AROpS3gFxIxCSRgAidakWZFN8jeQRgEhawgXZFF8jeQQgkOYoMMXfM7APAQikV5BN8TUgAhBIsSA7pd8rMBMBCJRSKcim+BqoEICAkirIpvgaqBCAwH0pjAZTPvcI7EMAAvfFXpBN8TUwgQAEKgkUZFN8DUwgAIH9Yh4Rxvx7A1ZGAAITIi7IpvgamEIAAgfFuFNK4QYfYCUEIHBQbAXZFF8DNQhAYEqEBdkUXwM1CECgXkwjw5h+L0BrCECgXiwF2RRfAzMQgECNiAqyY/g9AJ0gAIHZQi/IpvgamIMABGaIoCCb4mtgDgIQmC/kEWKM5xmB1hCAwHyhFmRTfA0sQAACcwRckE3xNbAAAQgsFuIoMcQ1A70iAIEFAizIpvgaWAIBCCwnpB1VyDfuAL0hAIHlhFKQTfE1sCQCEFhCQAXZFF8DSyIAgeWFMFoMYY2AFwhAYHm+F2RTfA2sgAAElhRAQbbPawO8QwACq/G1IJvia2BFBCCwAo8Lsim+BlZEAAKr83HUGNI5RcALBCCwOt8Ksim+BtZAAAIr8rAgm+JrYA0EILAen0aOPq0FCAYBCKzBo4Jsiq+BNRGAwPp82Hn5eEMOEAQCEFif64Jsiq+BBghAYE0eFGRTfA00QAACzbgcQTL+BBogAIFmXBVkU3wNNEQAAg04LMhm9wc0RAACzfVdkE3xNdACAhBoyEFBNsXXQAsIQKAdfY4kfTh/CASPAATa0VdBNsXXQEsIQKAFPRZkU3wNtIQABNrTx2iS8SfQEgIQaEkPBdkUXwMtIgCBdnW5Q+PsH9AiAhBoV1cF2RRfAy0jAIEWdViQTfE10DICEGhfF6NKxp9AywhAoH1tF2RTfA10gAAEWtZBQTa7P6ADBCDQjbYKsim+BjpCAAIdaLEgm+JroCMEINCdNkaXNL8AHSEAge40Lcim+BroEAEIdKSFgmyKr4EOEYBAt5qMMBl/Ah0iAIEONSjIpvga6BgBCHRvnZ0cZ/+AjhGAQPdWLcim+BroAQEIdGyNgmyKr4EeEIBAP1YZaTL+BHpAAAL9WLYgm+JroCcEINCDFQqy2f0BPSEAgf4sKsim+BroEQEI9GSJgmyKr4EeEYBAv+aNOGl+AXpEAAL9mlWQTfE10DMCEOjRnIJsiq+BnhGAQP/qRp2MP4GeEYBAz2oKsim+BhwgAAE3Jnd8nP0DHCAAATfGBdkUXwOObLpeAJCibEs37Vt6XZKl+BpwgwAE3HlFUuZ6EUCq/j++iHAUEbL5cgAAAABJRU5ErkJggg=="

export default function WheelOfFortune() {
    const [isWinOverlayVisible, setIsWinOverlayVisible] = useState(false)
    const [isLooseOverlayVisible, setIsLooseOverlayVisible] = useState(false)
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    let data = [
        { option: '0', image : {
            uri: 'https://api.paramall.tn/upload/img/paramall-beesline-faical-whitening-scrub-1080-61b1bbe09ff52005672587.jpg'
            }},
        { option: '1', image : {
                uri: 'https://api.paramall.tn/upload/img/paramall-gum-dentifrice-original-white-1745-61999a38c8da8978023603.jpg'
            }},
        { option: '2', image : {
                uri: 'https://api.paramall.tn/upload/img/paramall-avene-ecran-50-creme-629f68cb87362910771377.png'
            }},
        { option: '3', image : {
                uri: 'https://api.paramall.tn/upload/img/phyteal-deodorant-anti-transpirant-6195007aa59de444949031.jpg'
            }},
        { option: '4', image : {
            uri: 'https://api.paramall.tn/upload/img/paramall-beesline-pack-eclaicissant-62c009b6016a9863746829.png'
        }},
        { option: '10% de réduction' },
        { option: '15% de réduction' },
        { option: 'حاول مرة أخرى' },
    ];

    const handleSpinClick = () => {
        setPrizeNumber(7)
        setMustSpin(true)
    }

    const backgroundColors =['#cc5347', '#b3d0f8', '#fedb8e', '#b3d0f8', '#ffffff', '#b3d0f8', '#fedb8e', '#ffffff'];
    const textColors = ['#0b3351'];
    const outerBorderColor = '#ea6e35';
    const outerBorderWidth = 20;
    const innerBorderColor = '#30261a';
    const innerBorderWidth = 0;
    const innerRadius = 0;
    const radiusLineColor = '#eeeeee';
    const radiusLineWidth = 0;
    const fontFamily = 'Roboto';
    const fontSize = 15;
    const textDistance = 60;
    const spinDuration = 1.0;
    const pointerProps = {
        src: roulettePointerImageUri,
        style: { right: '50%', transform: 'translate(50%, 0)', top: '-20px' }
    }

    const borderShadow = {
        shadowWidth: 50,
        shadowColor: 'rgba(0, 0, 0, 0.01)'
    }

    const computeWinOrLoose = () => {
        setIsWinOverlayVisible(true)
        // setIsLooseOverlayVisible(true)
    }

    return (
        <>
            <Helmet>
                <title>Paramall : Roue de la Chance</title>
            </Helmet>
            <div className="wrapper">
                    <div className="logo">
                        <Link to="/">
                            <img
                                src="/img/logo.png"
                                className="img-fluid"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="title">
                        <img
                            src="/img/title_text.png"
                            className="img-fluid"
                            alt="title_text"
                        />
                    </div>
                    <div className="wheel-container">
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data}
                            backgroundColors={backgroundColors}
                            textColors={textColors}
                            fontFamily={fontFamily}
                            fontSize={fontSize}
                            outerBorderColor={outerBorderColor}
                            outerBorderWidth={outerBorderWidth}
                            innerRadius={innerRadius}
                            innerBorderColor={innerBorderColor}
                            innerBorderWidth={innerBorderWidth}
                            radiusLineColor={radiusLineColor}
                            radiusLineWidth={radiusLineWidth}
                            spinDuration={spinDuration}
                            startingOptionIndex={0}
                            textDistance={textDistance}
                            borderShadow={borderShadow}
                            pointerProps={pointerProps}
                            onStopSpinning={() => {
                                setMustSpin(true);
                                computeWinOrLoose()
                            }}
                        />
                        <button className="spin-btn" onClick={handleSpinClick}>Go</button>
                    </div>
                    <div className={clsx( 'win-overlay', {isVisible: isWinOverlayVisible}) }>
                        <div className="result-container">
                            <div className="title">مبروك <br/> paramall.tn<br/> تهديلك</div>
                            <div className="winning-product">Product</div>
                        </div>
                        <img
                            src="/img/win-overlay.png"
                            className="img-fluid"
                            alt="win-overlay"
                        />
                    </div>
                    <div className={clsx( 'loose-overlay', {isVisible: isLooseOverlayVisible}) }>
                        <div className="result-container">
                            <div className="title">حظ أوفر<br/> للمرّة الجايا</div>
                        </div>
                        <img
                            src="/img/loose-overlay.png"
                            className="img-fluid"
                            alt="loose-overlay"
                        />
                    </div>
                </div>
        </>
    );
}
