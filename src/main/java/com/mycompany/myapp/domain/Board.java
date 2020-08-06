package com.mycompany.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Board.
 */
@Entity
@Table(name = "board")
public class Board implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToMany(mappedBy = "board")
    private Set<Notice> noticeLists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Board title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Notice> getNoticeLists() {
        return noticeLists;
    }

    public Board noticeLists(Set<Notice> notices) {
        this.noticeLists = notices;
        return this;
    }

    public Board addNoticeList(Notice notice) {
        this.noticeLists.add(notice);
        notice.setBoard(this);
        return this;
    }

    public Board removeNoticeList(Notice notice) {
        this.noticeLists.remove(notice);
        notice.setBoard(null);
        return this;
    }

    public void setNoticeLists(Set<Notice> notices) {
        this.noticeLists = notices;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Board)) {
            return false;
        }
        return id != null && id.equals(((Board) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Board{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
