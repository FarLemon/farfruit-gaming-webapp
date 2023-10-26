import { Component, mergeProps, createSignal, For, Show, Switch, Match } from 'solid-js';

import "../styles/components/_creature-card.scss";



const getAllValues = (obj: any) => {
    let values = [];
    Object.values(obj).forEach((value) => {
        typeof value === 'object' ? values = values.concat(getAllValues(value)) : values.push(value);
    });
    return values;
}


const CreatureCard: Component = (props: any) => {
    const mergedProps = mergeProps({creature: {}, imageURLs: {}, sectionOpen: {stats: false, modifiers: false}}, props);
    const creature = mergedProps.creature;

    const [statsOpen, statsOpenSet] = createSignal(mergedProps.sectionOpen.stats);
    const [modifiersOpen, modifiersOpenSet] = createSignal(mergedProps.sectionOpen.modifiers);



    return (
    <div class="creature-card">

        <div class="creature-card__header">
            <h1>{creature.name}</h1>
            <img src={creature.image_url}/>
        </div>



        <div class="creature-card__content">


            <div class={`module ${statsOpen() ? "openned" : ""}`} id="stats">
                <div class="header" onClick={() => {statsOpenSet(!statsOpen())}}>
                    <h2>Stats</h2>
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 1024 1024"><path d="M548.08576 722.24768c-10.19904 10.19904-24.00256 19.70176-37.15072 16.75264-13.14816 2.17088-25.47712-8.192-35.67616-16.75264L159.744 405.17632a41.24672 41.24672 0 0 1 58.20416-58.32704l293.64224 301.6704 294.42048-301.6704A41.24672 41.24672 0 1 1 864.256 405.17632l-316.29312 317.07136z"  /></svg>
                </div>

                <div class="data">
                    <section>
                        <h3>Health</h3>
                        <p>{creature.health}</p>
                    </section>

                    <section>
                        <h3>Defense</h3>
                        <p>{creature.defense}</p>
                    </section>

                    <section>
                        <h3>Resist</h3>
                        <div>
                            <Switch fallback={<p>{creature.multipliers.base_resist["1.00"]}</p>}>
                                <Match when={Object.keys(creature.multipliers.base_resist).length > 1} >
                                    <For each={Object.keys(creature.multipliers.base_resist).sort(function(a, b) {return Number(b) - Number(a)})}>
                                        {(key) => <p>{parseFloat(String(Number(key) * 100)).toFixed(0)}% - {parseFloat(String(creature.multipliers.base_resist[key])).toFixed(2)}</p>}
                                    </For>
                                </Match>
                            </Switch>
                        </div>
                    </section>
                </div>
            </div>



            <Show when={getAllValues(Object.fromEntries(Object.entries(creature.multipliers).filter(([key]) =>key !== 'base_resist'))).some((value) => value != 1)}>
            <div class={`module ${modifiersOpen() ? "openned" : ""}`} id="modifiers" style={statsOpen() ? "border-top-width: 0" : ""}>
                <div class="header" onClick={() => {modifiersOpenSet(!modifiersOpen())}}>
                    <h2>Modifiers</h2>
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 1024 1024"><path d="M548.08576 722.24768c-10.19904 10.19904-24.00256 19.70176-37.15072 16.75264-13.14816 2.17088-25.47712-8.192-35.67616-16.75264L159.744 405.17632a41.24672 41.24672 0 0 1 58.20416-58.32704l293.64224 301.6704 294.42048-301.6704A41.24672 41.24672 0 1 1 864.256 405.17632l-316.29312 317.07136z"  /></svg>
                </div>



                <div class="data">

                    <Show when={Object.values(creature.multipliers.type).some((value) => Number(value) != 1)}>
                    <div id="type">
                        <h3>Type Damage</h3>
                        <Show when={Object.values(creature.multipliers.type).some((value) => Number(value) > 1)}>
                        <section>
                            <h4>Weakness</h4>
                            <div>
                                <For each={Object.entries(creature.multipliers.type)}>
                                    {(entry) =>
                                        <Show when={Number(entry[1]) > 1}>
                                        <div>
                                            <img src={mergedProps.imageURLs[entry[0]]}/>
                                            <p>{entry[0].replace(/^./, entry[0][0].toUpperCase())}</p>
                                            <p>{`+${String((Number(entry[1]) * 100 - 100))}%`}</p>
                                        </div>
                                        </Show>
                                    }
                                </For>
                            </div>
                        </section>
                        </Show>


                        <Show when={Object.values(creature.multipliers.type).some((value) => Number(value) < 1)}>
                        <section>
                            <h4>Resistance</h4>
                            <div>
                            <For each={Object.entries(creature.multipliers.type)}>
                                {(entry) =>
                                    <Show when={Number(entry[1]) < 1}>
                                    <div>
                                        <img src={mergedProps.imageURLs[entry[0]]}/>
                                        <p>{entry[0].replace(/^./, entry[0][0].toUpperCase())}</p>
                                        <p>{`${String((Number(entry[1]) * 100 - 100))}%`}</p>
                                    </div>
                                    </Show>
                                }
                            </For>
                            </div>
                        </section>
                        </Show>
                    </div>
                    </Show>



                    <Show when={Object.values(creature.multipliers.elemental).some((value) => Number(value) != 1)}>
                    <div id="elemental">
                        <h3>Elemental Damage</h3>
                        <Show when={Object.values(creature.multipliers.elemental).some((value) => Number(value) > 1)}>
                        <section>
                            <h4>Weakness</h4>
                            <div>
                            <For each={Object.entries(creature.multipliers.elemental)}>
                                {(entry) =>
                                    <Show when={Number(entry[1]) > 1}>
                                    <div>
                                        <img src={mergedProps.imageURLs[entry[0]]}/>
                                        <p>{entry[0].replace(/^./, entry[0][0].toUpperCase())}</p>
                                        <p>{`+${String((Number(entry[1]) * 100 - 100))}%`}</p>
                                    </div>
                                    </Show>
                                }
                            </For>
                            </div>
                        </section>
                        </Show>


                        <Show when={Object.values(creature.multipliers.elemental).some((value) => Number(value) < 1)}>
                        <section>
                            <h4>Resistance</h4>
                            <div>
                            <For each={Object.entries(creature.multipliers.elemental)}>
                                {(entry) =>
                                    <Show when={Number(entry[1]) < 1}>
                                    <div>
                                        <img src={mergedProps.imageURLs[entry[0]]}/>
                                        <p>{entry[0].replace(/^./, entry[0][0].toUpperCase())}</p>
                                        <p>{`${String((Number(entry[1]) * 100 - 100))}%`}</p>
                                    </div>
                                    </Show>
                                }
                            </For>
                            </div>
                        </section>
                        </Show>
                    </div>
                    </Show>



                    <Show when={Object.values(creature.multipliers.alternate).some((value) => value != 1)}>
                    <div id="alternate">
                        <h3>Alternate Damage</h3>
                        <section>
                        <For each={Object.entries(creature.multipliers.alternate)}>
                            {(entry) =>
                                <Show when={Number(entry[1]) < 1}>
                                <div>
                                    <h4>{entry[1] == 0 ? "Immune" : "Resistant"}</h4>
                                    <div>
                                        <img src={mergedProps.imageURLs[entry[0]]}/>
                                        <p>{entry[0].replace(/^./, entry[0][0].toUpperCase())}</p>
                                        <Show when={entry[1] != 0}><p>{`${String((Number(entry[1]) * 100 - 100))}%`}</p></Show>
                                    </div>
                                </div>
                                </Show>
                            }
                        </For>
                        </section>
                    </div>
                    </Show>
                </div>
            </div>
            </Show>

        </div>

    </div>
    );
};
export default CreatureCard;